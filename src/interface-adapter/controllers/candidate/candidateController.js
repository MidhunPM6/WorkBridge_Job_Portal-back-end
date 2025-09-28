import { log } from 'console'
import candidateContainer from '../../../infrastructure/containers/candidateContainer.js'

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
  changeNameUseCase,
  verificationEmailUseCase,
  deleteAccountUseCase,
  deleteResumeUseCase,
  applyJobUseCase,
  appliedJobUseCase
} = candidateContainer()


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
  

    return res
      .status(200)
      .json({ success: true, message: 'Successfully updated', data: response })
  } catch (error) {
    console.error(error.message)
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
  }
}

// Posting experiance details
export const experienceController = async (req, res) => {
  
  if (!req.userID) {
    return res
      .status(401)
      .json({ message: 'The user ID is required for authorization' })
  }
  if (!req.body) {
    return res.status(400).json({ message: 'All feilds are required' })
  }

  try {
    const response = await experienceUseCase.execute(req.body, req.userID)
    return res
      .status(200)
      .json({ success: true, data: response, message: 'Successfully Added' })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
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
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
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
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
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
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
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
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
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
    return res.status(500).json({ message: error.message || 'Server Error' })
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

    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: ' Data not found' })
    }
    return res
      .status(200)
      .json({ success: true, message: 'Fetched Successfully ', data: response })
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
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
      .json({ success: true, data:response, message: 'Resume successfully uploaded' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
  }
}

//  Username chnage controller
export const nameChangeController = async (req, res) => {
  const userID = req.userID
  const { password, name } = req.body

  const data = {
    name,
    password,
    userID
  }

  if (!data) {
    return res
      .status(400)
      .json({ success: false, message: 'Fill all fields to continue' })
  }
  try {
    const response = await changeNameUseCase.execute(data)
    console.log(response)
    return res
      .status(200)
      .json({ success: true, data: response, message: 'Successfully updated' })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({ message: error.message || 'Server Error' })
  }
}

// Otp send to Email ID
export const otpGenarateController = async (req, res) => {
  const { email, password } = req.body

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: 'Email is required' })
  }
  try {
    const response = await verificationEmailUseCase.execute(email, password)
    console.log(response)

    return res.status(200).json({
      success: true,
      data: response,
      message: 'Verification code sent to the email'
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
  }
}

export const verifyOtpController = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body
  if (!email || !verificationCode || !newPassword) {
    return res.status(400).json({
      success: false,
      message: 'Need to fiil all the field to continue '
    })
  }

  try {
    const response = await verificationEmailUseCase.verifyOtpAndUpdate(
      email,
      verificationCode,
      newPassword
    )
    if (!response) {
      return res
        .status(400)
        .json({ success: false, message: 'Code verification not done' })
    }
    return res
      .status(200)
      .json({ success: true, message: 'Verify and updated the password' })
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Server Error' })
  }
}

//  Controller to manage the Delete candidate account
export const deleteAccountController = async (req, res) => {
  const userID = req.userID
  console.log('userID:', userID);
  
  if (!userID) {
    return res.status(401).json({
      success: false,
      message: 'The UserID not authorized or invalid '
    })
  }
  try {
    const response = await deleteAccountUseCase.execute(userID)
    return res.status(200).json({
      success: true,
      data: response,
      message: 'User Deleted not able to retrive'
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
  }
}

// Controller to manage deletetion of resume

export const deleteResumeController = async (req, res) => {
  const userID = req.userID
  if (!userID) {
    return res.status(401).json({
      success: false,
      message: 'User ID not authorized, Please check again.'
    })
  }
  try {
    const response = await deleteResumeUseCase.execute(userID)
    if (!response) {
      return res.status(400).json({
        success: false,
        message: 'Resume not deleted, Please try again '
      })
    }
    return res.status(200).json({
      success: true,
      message: ' Resume deleted successfully',
      data: response
    })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

//  Controller to save the applied job data

export const applyJobController = async (req, res) => {
  const { employerId, jobId } = req.body
  const userID = req.userID
  console.log('Applying for job:', jobId, 'by user:', userID)

  if (!employerId || !jobId || !userID) {
    return res.status(400).json({
      success: false,
      message: 'Employer ID, Job ID and User ID are required'
    })
  }

  try {
    const response = await applyJobUseCase.execute(employerId, jobId, userID)

    return res.status(200).json({
      success: true,
      data: response,
      message: 'Successfully applied for the job'
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: error.message || 'Server Error' })
  }
}

// Getting the Job IDs to check the user Already applied or not

export const getAppliedJobsController = async (req, res) => {
  try {
    const userId = req.userID
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: 'Invalid or Unauthorized Token' })
    }
    const appliedJobs = await appliedJobUseCase.execute(userId)
    return res
      .status(200)
      .json({
        success: true,
        appliedJobs,
        message: 'Fetched Applied JobIDs successfully'
      })
  } catch (error) {
    console.error(error.message)

    return res
      .status(500)
      .json({ success: false, message: error || 'Server Error' })
  }
}
