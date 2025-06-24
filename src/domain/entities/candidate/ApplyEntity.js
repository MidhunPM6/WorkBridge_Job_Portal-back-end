import mongoose from 'mongoose'

export default class ApplyEntity {
  constructor (employerId, jobId, userID, profileId, educationIds, experienceIds, createdAt, updatedAt) {
    this.employerId = employerId
    this.jobId = jobId
    this.userID = userID
    this.profileId = profileId
    this.educationIds = educationIds
    this.experienceIds = experienceIds
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date().toString()

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
    if(this.profileId && !this.isValidObjectId(this.profileId)) {
      throw new Error('Invalid profile ID')
    }
   
  } 
    isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  static create (employerId, jobId, userID, profileId, educationIds, experienceIds) {
    return new ApplyEntity(employerId, jobId, userID, profileId, educationIds, experienceIds)
  }

  toDto () {
    return {
      employerId: this.employerId,
      jobId: this.jobId,
      userID: this.userID,
      profileId: this.profileId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      educationIds: this.educationIds,
      experienceIds: this.experienceIds
    }
  }
}
