import mongoose from 'mongoose'

export default class ApplyEntity {
  constructor (employerId, jobId, userID) {
    this.employerId = employerId
    this.jobId = jobId
    this.userID = userID
    this.validate()
  }

  validate () {
    if (this.employerId && !this.isValidObjectId(this.employerId)) {
      throw new Error('Invalid employer ID')
    }
    if (this.jobId && !this.isValidObjectId(this.jobId)) {
      throw new Error('Invalid job ID')
    }
    if (this.userID && !this.isValidObjectId(this.userID)) {
      throw new Error('Invalid user ID')
    }
  }
    isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  static create (employerId, jobId, userID) {
    return new ApplyEntity(employerId, jobId, userID)
  }

  toDto () {
    return {
      employerId: this.employerId,
      jobId: this.jobId,
      userID: this.userID
    }
  }
}
