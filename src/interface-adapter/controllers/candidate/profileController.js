import candidateContainer from '../../../infrastucture/containers/candidateContainer.js'

const {
  profileUploadUseCase,
  profileUseCase,
  experienceUseCase,
  fetchExperienceUseCase,
  educationUseCase,
  fetchEducationUseCase,
  deleteExperienceUseCase,
  deleteEducationUseCase
} = candidateContainer()

// Profile file upload controller
export const profileFileUpload = async (req, res) => {
  const file = req.file
  const userID = req.userID

  if (!req.userID) {
    return res.status(401).json({ message: 'UserID not provided ' })
  }
  if (!req.file) {
    return res.status(400).json({ message: 'File not provided ' })
  }

  try {
    const uploadFile = await profileUploadUseCase.execute({ file, userID })

    res.status(200).json({ message: 'File saved successfully' }, uploadFile)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// Method to excute the personal details
export const personalProfile = async (req, res) => {
  const { designation, mobile, location, portfolio, linkedin, about, skills } =
    req.body

  if (!req.userID) {
    return res.status(401).json({ message: 'Unauthorized to Access' })
  }

  try {
    const response = await profileUseCase.execute(
      designation,
      mobile,
      location,
      portfolio,
      linkedin,
      about,
      skills,
      req.userID
    )
    return res
      .status(200)
      .json({ message: 'Successfully updated', response: response })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Server Error' })
  }
}

// Posting experiance details
export const experienceController = async (req, res) => {
  if (!req.userID) {
    return res
      .status(401)
      .json({ message: 'The user ID is required for authorization' })
  }
  if (req.body === null) {
    return res.status(400).json({ message: 'The data passed may be null' })
  }

  try {
    const response = await experienceUseCase.execute(req.body, req.userID)
    return res.status(200).json({ success: true, data: response })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get all the experience data by the user ID
export const getExperience = async (req, res) => {
  const { userID } = req

  if (!userID) {
    return res.status(401).json({ message: 'User ID not received or invalid ' })
  }
  try {
    const response = await fetchExperienceUseCase.execute(userID)
    return res.status(200).json({ success: true, data: response })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: 'Server Error' })
  }
}

// Education Controller to store candidate education data
export const educationController = async (req, res) => {
  const { college, field, StartDate, Passed } = req.body
  const userID = req.userID

  const educationData = {
    college,
    field,
    StartDate,
    Passed,
    userID
  }

  if (!college || !field || !StartDate || !Passed || !userID) {
    return res.status(400).json({ message: 'Data not found' })
  }
  if (!userID) {
    return res
      .status(401)
      .json({ message: 'User ID required or Unauthorized user' })
  }

  try {
    const response = await educationUseCase.execute(educationData)
    if (!response) {
      return res.status(400).json({ message: 'Something went wrong ' })
    }
    return res.status(200).json({ success: true, data: response })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ success: false, message: error.message })
  }
}

// Fetch the education details from the database

export const getEducation = async (req, res) => {
  const userID = req.userID
  if (!userID) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized or the user id is invalid'
    })
  }

  try {
    const response = await fetchEducationUseCase.execute(userID)
    if (!response) {
      return res.status(400).json({
        success: false,
        message: "The user don't have education details "
      })
    }
    return res.status(200).json({ success: true, data: response })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// The Method used to delete the experience data from Database
export const deleteExperience = async (req, res) => {
  const expID = req.params.id
  if (!expID) {
    return res
      .status(400)
      .json({ message: 'Expreience ID not received, Please check again' })
  }
  try {
    const response = await deleteExperienceUseCase.execute(expID)
    if (!response) {
      return res.status(404).status({
        success: false,
        message: 'Something went wrong, nothing to return'
      })
    }
    return res.status(200).status({
      success: true,
      data: response,
      message: 'Successfully deleted'
    })
  } catch (error) {
    return res.status(500).status({ success: false, message: 'Server Error' })
  }
}

// The Method used to delete the education data from Database
export const deleteEducation = async (req, res) => {
  const eduID = req.params.id
  if (!eduID) {
    return res
      .status(400)
      .json({ success: false, message: ' The Education ID is required' })
  }
  try {
    const response = await deleteEducationUseCase.execute(eduID)
    console.log(response)
    if (!response) {
      return res
        .status(404)
        .json({ success: false, message: 'The ID having no such data ' })
    }

    return res
      .status(200)
      .json({ success: true, message: 'Deleted successfully' })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message })
  }
}
