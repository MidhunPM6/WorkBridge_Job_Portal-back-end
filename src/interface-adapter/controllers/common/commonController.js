import commonContainer from '../../../infrastructure/containers/commonContainer.js'
import employerContainer from '../../../infrastructure/containers/employerContainer.js'

const { fetchAllJobsUseCase } = employerContainer()
const {profileUploadUseCase} = commonContainer()

// Profile Pic and Cover Pic Upload Controller
export const profileFileUpload = async (req, res) => {
  const file = req.file
  const { fileType, role } = req.body
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
      fileType,
      role
    })

    return res
      .status(200)
      .json({ success: true, message: 'File saved successfully', uploadFile })
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: error.message || 'Server Error' })
  }
}

// Fetch all jobs controller 
export const fetchAllJobsController = async (req, res) => {
  const userID = req.userID
  if (!userID) {
    return res.status(401).json({ message: 'Unauthorized or token missing' })
  }

  try {
    const jobs = await fetchAllJobsUseCase.execute()
    return res.status(200).json({
      success: true,
      jobs
    })
  } catch (error) {
    console.error('Error fetching all jobs:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
