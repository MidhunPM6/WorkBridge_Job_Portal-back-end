export default class JobEntity {
  constructor ({
    id,
    title,
    job_description,
    company_name,
    job_type,
    location,
    salary,
    userID,
    createdAt,
    updatedAt
  }) {
    this.id = id || null
    this.title = title
    this.job_description = job_description
    this.company_name = company_name
    this.location = location
    this.salary = Number(salary) 
    this.job_type = job_type?.toLowerCase() 
    this.userID = userID
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date()
    this.validate()
  }

  validate () {
    if (!this.title || this.title.length < 3) {
      throw new Error('Title must be at least 3 characters long')
    }

    if (!this.job_description || this.job_description.length < 10) {
      throw new Error('Description must be at least 10 characters long')
    }

    if (!this.company_name || this.company_name.length < 3) {
      throw new Error('Company name must be at least 3 characters long')
    }

    if (!this.location || this.location.length < 3) {
      throw new Error('Location must be at least 3 characters long')
    }

    if (!this.salary || isNaN(this.salary)) {
      throw new Error('Salary must be a valid number')
    }

    if (
      !this.userID ||
      typeof this.userID !== 'string' ||
      this.userID.length < 5
    ) {
      throw new Error(
        'userID must be a valid string with at least 5 characters'
      )
    }

    if (
      !this.job_type ||
      !['full-time', 'part-time', 'contract'].includes(this.job_type)
    ) {
      throw new Error(
        'Job type must be either full-time, part-time, or contract'
      )
    }
  }

    static create (data) {
    const job= new JobEntity(data)
    job.validate()
    return job
  }

  static rehydrate (data) {
    return new JobEntity(
      data.id,
      data.title,
      data.job_description,
      data.company_name,
      data.location,
      data.salary,
      data.job_type,
      data.userID,
      data.createdAt,
      data.updatedAt
    )
  }

  toDTO () {
    return {
      id: this.id,
      title: this.title,
      job_description: this.job_description,
      company_name: this.company_name,
      location: this.location,
      salary: this.salary,
      job_type: this.job_type,
      userID: this.userID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
