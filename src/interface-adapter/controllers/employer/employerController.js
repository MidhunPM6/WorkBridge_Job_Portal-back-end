import employerContainer from '../../../infrastructure/containers/employerContainer.js'

const { postJobUseCase, fetchAllJobsUseCase, fetchMyJobsUseCase,updateJobUseCase } = employerContainer()

export const employerJobPostController = async (req, res) => {
  const userID = req.userID
  const { title, job_description, company_name, job_type, location, salary } =
    req.body
  console.log(req.body);
  
  const jobPostData = {
    title,
    job_description,
    company_name,
    job_type,
    location,
    salary,
    userID
  }
  try {
    // Validate the input data
    if (
      !title ||
      !job_description ||
      !company_name ||
      !job_type ||
      !location ||
      !salary
    ) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    const response = await postJobUseCase.execute(jobPostData)
    return res.status(201).json({
      success: true,
      message: 'Job post created successfully',
      data: response
    })
  } catch (error) {
    console.error('Error creating job post:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

//  Fetch all jobs controller 
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

// Fetch my jobs controller 

export const fetchMyJobsController = async (req, res) => {
  const userID = req.userID
  if (!userID) {
    return res.status(401).json({ message: 'Unauthorized or token missing' })
  }
  
  try {
    const jobs = await fetchMyJobsUseCase.execute(userID)
    if (!jobs || jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this employer' })
    }
    return res.status(200).json({
      success: true,
      jobs
    })
  } catch (error) {
    console.error('Error fetching my jobs:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

// update job controller
export const updateJobController = async (req, res) => {
  const userID = req.userID
  
  const { id,title, job_description, company_name, job_type, location, salary } =
    req.body

  if (!userID) {
    return res.status(401).json({ message: 'Unauthorized or token missing' })
  }

  try {
    const jobData = {
      id,
      title,
      job_description,
      company_name,
      job_type,
      location,
      salary,
      userID
    }
    console.log(jobData); 
    
    
    const updatedJob = await updateJobUseCase.execute(jobData)
    return res.status(200).json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob
    })
  } catch (error) {
    console.error('Error updating job:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}