export default class JobEntity {
  constructor (
    title,
    description,
    companyName,
    location,
    salary,
    jobType,
    userID,
    createdAt,
    updatedAt
  ) {
    this.id = id || null
    this.title = title
    this.description = description
    this.companyName = companyName
    this.location = location
    this.salary = salary
    this.jobType = jobType
    this.userID = userID
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date()
    this.validate()
  }

  validate () {
    if (!this.title || this.title.length < 3) {
      throw new Error('Title must be at least 3 characters long')
    }

    if (!this.description || this.description.length < 10) {
      throw new Error('Description must be at least 10 characters long')
    }

    if (!this.companyName || this.companyName.length < 3) {
      throw new Error('Company name must be at least 3 characters long')
    }

    if (!this.location || this.location.length < 3) {
      throw new Error('Location must be at least 3 characters long')
    }

    if (!this.salary || isNaN(this.salary)) {
      throw new Error('Salary must be a valid number')
    }
    //make a userid validatio

    if (
      !this.jobType ||
      !['full-time', 'part-time', 'contract'].includes(this.jobType)
    ) {
      throw new Error(
        'Job type must be either full-time, part-time, or contract'
      )
    }
  }

  static create (data) {
    const experience = new ExperienceEntity(data)
    experience.validate()
    return experience
  }

  static rehydrate (data) {
    return new  JobEntity({
      id: data.id,
      title: data.title,
      description: data.description,
      companyName: data.companyName,
      location: data.location,
      salary: data.salary,
      jobType: data.jobType
    })
  }

  toDTO () {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      companyName: this.companyName,
      location: this.location,
      salary: this.salary,
      jobType: this.jobType,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
