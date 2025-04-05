export default class ProfileEntity {
  constructor (
    {
      designation,
      mobile,
      location,
      portfolio,
      linkedin,
      about,
      skills=[],
      userID,
      createdAt,
      updatedAt
    } = {},
    
  ) {
    this.location = location
    this.designation = designation
    this.mobile = mobile
    this.linkedin = linkedin
    this.portfolio = portfolio
    this.about = about
    this.skills = skills
    this.userID = userID
    this.createdAt = createdAt || new Date().toString()
    this.updatedAt = updatedAt || new Date()

   
  }

  

  //  Updating the partial data from the request
  static createPartial (data) {
    const profile = new ProfileEntity({})
    if (data.designation) profile.designation = data.designation
    if (data.location) profile.location = data.location
    if (data.mobile) profile.mobile = data.mobile
    if (data.linkedin) profile.linkedin = data.linkedin
    if (data.portfolio) profile.portfolio = data.portfolio
    if(data.skills) profile.skills = data.skills
    if (data.about) profile.about = data.about
    if (data.userID) profile.userID = data.userID

    return profile
  }

  toDTO () { 
    return {
      designation: this.designation,
      location: this.location,
      mobile: this.mobile,
      linkedin: this.linkedin,
      portfolio: this.portfolio,
      skills: this.skills,
      about: this.about,
      userID: this.userID,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
