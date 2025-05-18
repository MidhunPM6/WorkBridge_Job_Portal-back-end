import employerContainer from '../../../infrastructure/containers/employerContainer.js'

const { postJobUseCase } = employerContainer()

export const employerJobPostController = async (req, res) => {
  const userID = req.userID
  const {title,job_description,company_name,job_type,location,salary} = req.body

  const jobPostData ={
    title,job_description,company_name,job_type,location,salary,userID

  }
  try { 
    
    
    // Validate the input data
    if (!title || !job_description ||!company_name|| !job_type || !location || !salary) {
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
