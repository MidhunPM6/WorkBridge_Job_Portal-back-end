export default class ProfileUseCase {
  constructor (profileEntity, profileRepository) {
    this.profileEntity = profileEntity
    this.profileRepository = profileRepository
  }
  async execute (
    designation,
    mobile,
    location,
    portfolio,
    linkedin,
    about,
    skills
  ) {
    console.log(linkedin);
    
    const profileEntity = this.profileEntity.create(
      designation,
      mobile,
      location,
      portfolio,
      linkedin,
      about, 
      skills
    )

    console.log(profileEntity)
  }
}
