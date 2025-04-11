import candidateContainer from '../../../infrastucture/containers/candidateContainer.js'

const {
  profileUploadUseCase,
  profileUseCase,
  experienceUseCase,
  fetchExperienceUseCase,
  educationUseCase,
  fetchEducationUseCase,
  deleteExperienceUseCase,
  deleteEducationUseCase,
  fetchProfieUseCase,
  resumeUploadUseCase,
  changeNameUseCase
} = candidateContainer()

// Profile file upload controller
export const profileFileUpload = async (req, res) => {
  const file = req.file
  const { fileType } = req.body
  const userID = req.userID

  if (!req.userID) {
    return res.status(401).json({ message: 'UserID not provided ' })
  }
  if (!req.file) {
    return res.status(400).json({ message: 'File not provided ' })
  }

  try {
    const uploadFile = await profileUploadUseCase.execute({
      file,
      userID,
      fileType
    })

    return res
      .status(200)
      .json({ success: true, message: 'File saved successfully', uploadFile })
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
    return res
      .status(401)
      .json({ success: false, message: 'Unauthorized to Access' })
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
    console.log(response)

    return res
      .status(200)
      .json({ success: true, message: 'Successfully updated', data: response })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ success: false, message: error.message })
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
    return res
      .status(200)
      .json({ success: true, data: response, message: 'Successfully Added' })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// Get all the experience data by the user ID
export const getExperience = async (req, res) => {
  const userID = req.userID

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
    return res.status(400).json({ message: 'Fill all the fields to continue' })
  }
  if (!userID) {
    return res
      .status(401)
      .json({ message: 'User ID required or Unauthorized user' })
  }

  try {
    const response = await educationUseCase.execute(educationData)

    return res
      .status(200)
      .json({ success: true, data: response, message: 'Successfully Added' })
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
      return res.status(404).json({
        success: false,
        message: 'Something went wrong, nothing to return'
      })
    }
    return res.status(200).json({
      success: true,
      data: response,
      message: 'Successfully deleted'
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server Error' })
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

//  Fetching the Profile document
export const getProfile = async (req, res) => {
  const userID = req.userID
  console.log(userID)

  if (!userID) {
    return res
      .status(401)
      .json({ success: false, message: 'User ID unauthorized or invalid' })
  }
  try {
    const response = await fetchProfieUseCase.execute(userID)
    console.log(response)

    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: ' Data not found' })
    }
    return res
      .status(200)
      .json({ success: true, message: 'Fetched Successfully ', data: response })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// Candidate resume upload
export const resumeUploadController = async (req, res) => {
  const userID = req.userID
  const file = req.file

  if (!userID) {
    return res.status(401).json({
      success: false,
      message: 'Check the User ID is Authorized or not'
    })
  }
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: 'File not found or missing' })
  }
  try {
    const response = await resumeUploadUseCase.execute(file, userID)
    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: 'No data recevied from the response' })
    }
    return res
      .status(200)
      .json({ success: true, message: 'Resume successfully uploaded' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ success: false, message: error.message })
  }
}

//  Username chnage controller
export const nameChangeController = async (req, res) => {
  const userID = req.userID
  const { password, name } = req.body

  const data = { userID, password, name }

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: 'Make sure the data is valid.' })
  }
  try {
    const response = await changeNameUseCase.execute(data)
    console.log(response)
    return res
      .status(200)
      .json({ success: true, data: response, message: 'Successfully updated' })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message })
  }
}
