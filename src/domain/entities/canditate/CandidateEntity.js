export default class CandidateEntity {
  constructor ({ id, name, email, password, profilePic, createdAt, updatedAt }={},skipValidation=false) {
    this.id = id || null 
    this.name = name
    this.email =  email
    this.password = password
    this.profilePic = profilePic || null
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date()

    if(!skipValidation)
    this.validate()
  }

  validate () {
    if (!this.name || !this.name.length < 3) {
      throw new Error('Name must atleast 3 character long')
    }
 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.email)) {
      throw new Error('Check the email format')
    } 

    if (this.password && !this.password.startsWith("$2b$")) {   
      if (this.password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
      }
    }

    if (this.profilePic && !this.profilePic.startsWith('http')) {
      throw new Error(' Invalid profile picture URL')
    }
  }

  validatePartial(data) {
    if (data.name && data.name.length < 3) {
      throw new Error("Name must be at least 3 characters long.");
    }

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Invalid email format.");
      }
    }

    if (data.password && data.password.length < 6) {
      throw new Error("Password must be at least 6 characters long.");
    }

    if (data.profilePic && !data.profilePic.startsWith("http")) {
      throw new Error("Invalid profile picture URL.");
    }
  }

  //   Creating new user data and validate
  static create (data) {
    const user = new CandidateEntity(data)
    user.validate()
    return user
  }

//   This function is used to update the user data partially 
  static createPartial(data){
    const user = new CandidateEntity({},true)
    if (data.id) user.id = data.id
    if (data.name) user.name = data.name;
    if (data.email) user.email = data.email;
    if (data.password) user.password = data.password;
    if (data.profilePic) user.profilePic = data.profilePic;

    user.validatePartial(data)
    return user
  }

  //   Restore Entity after fetching data
  static rehydrate (data) {
    return new CandidateEntity({
      id: data.id,
      name: data.name,
      email: data.email,
      password : data.hashedPassword,
      profilePic: data.profilePic,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }



  toDTO () {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      profilePic: this.profilePic,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
