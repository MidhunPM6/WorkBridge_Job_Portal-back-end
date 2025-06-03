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
    updatedAt,
    skipValidation = false
  }) {
    this.id = id
    this.title = title
    this.job_description = job_description
    this.company_name = company_name
    this.location = location
    this.salary = salary
    this.job_type = job_type?.toLowerCase() 
    this.userID = userID
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date()
    this.skipValidation = skipValidation
    if (!skipValidation) {
      this.validate()
    }
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
    return new JobEntity({
      id: data.id,
      title: data.title,
      job_description: data.job_description,
      company_name: data.company_name,
      location: data.location,
      salary: data.salary,
      job_type: data.job_type,
      userID: data.userID,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      skipValidation: true
    })
  }

  static createPartial(data) {
  const job = new JobEntity({
    id: data.id || undefined,
    title: data.title || undefined ,
    job_description: data.job_description || undefined ,
    company_name: data.company_name || undefined ,
    location: data.location || undefined ,
    salary: data.salary || undefined ,
    job_type: data.job_type?.toLowerCase() || undefined ,
    userID: data.userID || undefined ,
    skipValidation: true,
  });
  
  return job;
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
