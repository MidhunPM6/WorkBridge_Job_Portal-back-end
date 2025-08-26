export default class ProfileEntity {
  constructor ({
    id,
    designation,
    mobile,
    location,
    portfolio,
    linkedin,
    about,
    skills ,
    userID,
    resume,
    createdAt,
    updatedAt
  } = {}) {
    this.id=id
    this.location = location
    this.designation = designation
    this.mobile = mobile
    this.linkedin = linkedin
    this.portfolio = portfolio
    this.about = about
    this.skills = skills
    this.userID = userID
    this.resume =resume
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date().toString()
  }

  //  Updating the partial data from the request
  static createPartial (data) {
    const profile = new ProfileEntity({}) 
    if (data.id) profile.designation = data.id
    if (data.designation) profile.designation = data.designation
    if (data.location) profile.location = data.location
    if (data.mobile) profile.mobile = data.mobile
    if (data.linkedin) profile.linkedin = data.linkedin
    if (data.portfolio) profile.portfolio = data.portfolio
    if (data.skills) profile.skills = data.skills
    if (data.about) profile.about = data.about
    if (data.userID) profile.userID = data.userID
    if (data.resume) profile.resume = data.resume

    return profile
  }

  // Rehydrate data while fetching
  static rehydrate(data){
    return new ProfileEntity({
      id : data.id,
      designation : data.designation,
      location : data.location,
      mobile : data.mobile,
      linkedin : data.linkedin,
      portfolio : data.portfolio,
      skills : data.skills,
      about : data.about,
      userID : data.userID,
      resume : data.resume,
    })
  }

  toDTO () {
    return {
      id: this.id,
      designation: this.designation,
      location: this.location,
      mobile: this.mobile,
      linkedin: this.linkedin,
      portfolio: this.portfolio,
      skills: this.skills,
      about: this.about,
      userID: this.userID,
      resume : this.resume,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
