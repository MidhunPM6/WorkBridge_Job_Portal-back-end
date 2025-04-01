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
    skills,
    userID
  ) {
    // Check the UserID recevied or not
    if (!userID) {
      throw new Error('The userID is missing or invalid')
    }

    try {
      //  Check with the userID if the profile exist or not
      const existingProfile = await this.profileRepository.findByID(userID)
      //  Profile exist then update the current data with existing data
      if (existingProfile) {
        const profileEntityObj = await this.profileEntity.createPartial({
          designation: designation ?? existingProfile.designation,
          mobile: mobile ?? existingProfile.mobile,
          location: location ?? existingProfile.location,
          portfolio: portfolio ?? existingProfile.portfolio,
          linkedin: linkedin ?? existingProfile.linkedin,
          about: about ?? existingProfile.about,
          skills: skills.length > 0 ? skills : existingProfile.skills,
          userID: userID
        })
        const profileDTO = await profileEntityObj.toDTO()
        const updatedData = await this.profileRepository.updateById(
          userID,
          profileDTO
        )
        return updatedData
      } else if (!existingProfile) {
        // If the profile not exist in the userId it will create a new profile
        const profileEntityObj = await this.profileEntity.createPartial({
          designation,
          mobile,
          location,
          portfolio,
          linkedin,
          about,
          skills: skills || [],
          userID
        })
        const profileDTO = await profileEntityObj.toDTO()
        const createdData = await this.profileRepository.create(profileDTO)
        return createdData
      }
    } catch (error) {
      console.error(error.message)
      throw new Error('Server Error')
    }
  }
}
