export default class CandidateProfileEntity {
  constructor ({
    designation,
    mobile,
    location,
    portfolio,
    linkedin,
    about,
    skills=[]
  }) {
    this.location = location
    this.designation = designation
    this.mobile = mobile
    this.linkedin = linkedin
    this.portfolio = portfolio
    this.about = about
    this.skills = skills

    this.validate()
  }

  validate () {
    if (!this.location || typeof this.location !== "string" || this.location.trim().length < 3){

      throw new Error('Provide atleast 3 characters for location ')
    }
    if (!this.designation || typeof this.designation !== "string" || this.designation.trim().length < 3) {
      throw new Error('Provide atleast 3 characters for designation')
    }
    if (!this.mobile || !/^\d+$/.test(this.mobile)) {
        throw new Error("Provide a valid numeric string for the mobile");
    }

    if(!this.linkedin || !this.linkedin.startsWith('http')){
      throw new Error("Provide a proper URL for the LinkedIn");
      
    }

    if(this.portfolio  && !this.portfolio.startsWith('http')){
        throw new Error("Provide a proper URL for the portfolio ");
        
    }
    if (!Array.isArray(skills)) {
        this.skills = [skills];  
    }
    this.skills.forEach((skill, index) => {
        if (typeof skill !== "string" || skill.trim() === "") {
            throw new Error(`Skill at index ${index} must be a non-empty string`);
        }
    })

    if (!this.about || this.about.length <= 20) {
      throw new Error('Provide at least 20 characters for about');
  }
  } 

  static create (designation,
    mobile,
    location,
    portfolio,
    linkedin,
    about,
    skills,) 
    {
    const profile = new CandidateProfileEntity({designation,
    mobile,
    location,
    portfolio,
    linkedin,
    about,
    skills,})
    profile.validate()
    return profile
  }
}
