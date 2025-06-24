export default class EmployerEntity {
  constructor (
    {
      id,
      name,
      email,
      password,
      role,
      profilePic,
      profileCoverPic,
      createdAt,
      updatedAt
    } = {},
    skipValidation = false
  ) {
    this.id = id || null
    this.name = name
    this.email = email
    this.password = password
    this.role = role
    this.profilePic = profilePic
    this.profileCoverPic = profileCoverPic
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date()

    if (!skipValidation) this.validate()
  }

  validate () {
    if (!this.name || this.name.length < 3) {
      throw new Error('Name must be at least 3 characters long')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(this.email)) {
      throw new Error('Check the email format')
    }

    if (this.password && !this.password.startsWith('$2b$')) {
      if (this.password.length < 6) {
        throw new Error('Password must be at least 6 characters long.')
      }
    }
    if (this.role && !['employer', 'candidate'].includes(this.role)) {
      throw new Error("Role must be either 'employer' or 'candidate'.")
    }

    if (this.profilePic && !this.profilePic.startsWith('http')) {
      throw new Error('Invalid profile picture URL')
    }
    if (this.profileCoverPic && !this.profileCoverPic.startsWith('http')) {
      throw new Error('Invalid profile cover picture URL.')
    }
  }

  validatePartial (data) {
    if (data.name && data.name.length < 3) {
      throw new Error('Name must be at least 3 characters long.')
    }

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        throw new Error('Invalid email format.')
      }
    }

    if (data.password && data.password.length < 6) {
      throw new Error('Password must be at least 6 characters long.')
    }
    if (data.role && !['employer', 'candidate'].includes(data.role)) {
      throw new Error("Role must be either 'employer' or 'candidate'.")
    }

    if (data.profilePic && !data.profilePic.startsWith('http')) {
      throw new Error('Invalid profile picture URL.')
    }
    if (data.profileCoverPic && !data.profileCoverPic.startsWith('http')) {
      throw new Error('Invalid profile cover picture URL.')
    }
  }

  //   Creating new user data and validate
  static create (data) {
    const user = new EmployerEntity(data)
    user.validate()
    return user
  }

  //   This function is used to update the user data partially
static createPartial(data) {
  const user = new EmployerEntity({}, true)
  if (data.id) user.id = data.id
  if (data.name) user.name = data.name
  if (data.email) user.email = data.email
  if (data.role) user.role = data.role
  if (data.password) user.password = data.password
  if (data.profilePic) user.profilePic = data.profilePic
  if (data.profileCoverPic) user.profileCoverPic = data.profileCoverPic

  user.validatePartial(data) 

  return user
}


  //   Restore Entity after fetching data
  static rehydrate (data) {
    return new EmployerEntity({
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      profilePic: data.profilePic,
      profileCoverPic: data.profileCoverPic,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    })
  }

 toDTO () {
  const dto = {}

  if (this.id !== undefined) dto.id = this.id
  if (this.name !== undefined) dto.name = this.name
  if (this.email !== undefined) dto.email = this.email
  if (this.password !== undefined) dto.password = this.password
  if (this.role !== undefined) dto.role = this.role
  if (this.profilePic !== undefined) dto.profilePic = this.profilePic
  if (this.profileCoverPic !== undefined) dto.profileCoverPic = this.profileCoverPic
  if (this.createdAt !== undefined) dto.createdAt = this.createdAt
  if (this.updatedAt !== undefined) dto.updatedAt = this.updatedAt

  return dto
}

}
