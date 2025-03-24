export default class CandidateEntity {
  constructor ({ id, name, email, password, profilePic, createdAt, updatedAt }) {
    this.id = id || null 
    this.name = name,
    this.email = email.toLowerCase()
    this.password = password || null
    this.profilePic = profilePic || null
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date()
    this.validate()
  }

  validate () {
    if (!this.name || !this.name.length > 3) {
      throw new Error('Name must atleast 3 character long')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.email)) {
      throw new Error('Check the email format')
    }

    if (this.password && this.password.length < 6) {
      throw new Error('Password need atleast 6 characters')
    }
    if (this.profilePic && !this.profilePic.startsWith('http')) {
      throw new Error(' Invalid profile picture URL')
    }
  }

  //   Creating new user data and validate
  static create (data) {
    const user = new CandidateEntity(data)
    user.validate()
    return user
  }

  //   Restore Entity after fetching data
  static rehydrate (data) {
    return new CandidateEntity({
      id: data.id,
      name: data.name,
      email: data.email,
      password : data.passsword,
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
