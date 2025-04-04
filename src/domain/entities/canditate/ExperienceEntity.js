export default class ExperienceEntity {
  constructor ({
    id,
    position,
    company,
    StartDate,
    EndDate,
    tasks,
    userID,
    createAt,
    updatedAt
  } = {}) {
    this.id = id || null ,
    this.position = position
    this.company = company
    this.StartDate = StartDate
    this.EndDate = EndDate
    this.tasks = tasks
    this.userID = userID
    this.createAt = createAt || new Date()
    this.updatedAt = updatedAt || new Date()
    this.validate()
  }
  validate () {
    if (!this.position || this.position.length < 3) {
      throw new Error('The postion must be at least 3 characters')
    }
    if (!this.company || this.company.length < 3) {
      throw new Error('The company must be at least 3 characters')
    }
    const startDate = new Date(`01 ${this.StartDate}`)
    const endDate = new Date(`01 ${this.EndDate}`)

    if (startDate >= endDate) {
      throw new Error('Start date must be before the Passed out date ')
    }
    if (!this.tasks || this.tasks.length < 3) {
      throw new Error('The tasks must be at least 3 characters')
    }
    if (!this.userID) {
      throw new Error('The User ID is required')
    }
  }

  static create (data) {
    const experience = new ExperienceEntity(data)
    experience.validate()
    return experience
  }

  static rehydrate (data) {
    return new ExperienceEntity({
      id : data.id,
      position: data.position,
      company: data.company,
      StartDate: data.StartDate,
      EndDate: data.EndDate,
      tasks: data.tasks,
      userID: data.userID
    })
  }

  toDTO () {
    return {
      id : this.id,
      position: this.position,
      company: this.company,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      tasks: this.tasks,
      userID: this.userID
    }
  }
}
