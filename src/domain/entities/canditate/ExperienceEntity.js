export default class ExperienceEntity {
  constructor ({
    position,
    company,
    StartDate,
    EndDate,
    tasks,
    userID,
    createAt,
    updatedAt
  } = {}) {
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
    if (!this.StartDate || !this.EndDate) {
      throw new Error('Start date or End date is missing');
    }
    if (this.StartDate <= this.EndDate) {
      throw new Error('The date before the end date')
    } else {
      console.log('Valid dates')
    }
    if (!this.tasks || this.tasks.length < 3) {
      throw new Error('The tasks must be at least 3 characters')
    }
    if (!this.userID ) {
      throw new Error('The User ID is required')
    }
  }

  static create (data) {
    const experience = new ExperienceEntity(data)
    experience.validate()
    return experience
  }

  toDTO () {
    return {
      position: this.position,
      company: this.company,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      tasks: this.tasks,
      userID : this.userID
    }
  }
}
