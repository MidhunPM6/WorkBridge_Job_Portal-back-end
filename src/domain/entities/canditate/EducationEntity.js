export default class EducationEntity {
  constructor ({
    college,
    field,
    StartDate,
    Passed,
    userID,
    createdAt,
    updatedAt
  } = {}) {
    ;(this.college = college),
      (this.field = field),
      (this.StartDate = StartDate)
    this.Passed = Passed
    this.userID = userID
    this.createdAt = createdAt || new Date()
    this.updatedAt = updatedAt || new Date()

    this.validate()
  }

  async validate () {
    if (!this.college || this.college.length < 3) {
      throw new Error('Required at least 3 characters for college')
    }
    if (!this.field || this.field.length < 3) {
      throw new Error('Required at least 3 characters for field')
    }
    const startDate = new Date(`01 ${this.StartDate}`)
    const passed = new Date(`01 ${this.Passed}`)

    if (startDate >= passed) {
      throw new Error('Start date must be before the Passed out date ')
    }
    if (!this.userID) {
      throw new Error('The User ID is required')
    }
  }

  static create (data) {
    const addEducation = new EducationEntity(data)
    addEducation.validate()
    return addEducation
  }

  static rehydrate (data) {
    return new EducationEntity({
      college:data.college,
      field : data.field,
      StartDate : data.StartDate,
      Passed : data.Passed,
      userID : data.userID,
    })
  }

  toDTO () {
    return {
      
      college: this.college,
      field: this.field,
      StartDate: this.StartDate,
      Passed: this.Passed,
      userID: this.userID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
 