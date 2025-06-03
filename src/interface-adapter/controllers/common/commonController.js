import employerContainer from "../../../infrastructure/containers/employerContainer.js"

  
  
  
  const {fetchAllJobsUseCase} = employerContainer()
  
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