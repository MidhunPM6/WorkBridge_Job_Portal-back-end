const AppliedJobs = require('../Models/Appliedjob')
const PostedJob = require('../Models/JobPostSchema')

exports.AppliedJob = async (req, res) => {
  const { JobID, UserID,EmpID } = req.body

  const existingAppliedJob = await AppliedJobs.findOne({
    jobid: JobID,
    userid: UserID
  })
  if (existingAppliedJob) {
    return res.status(400).json({ message: 'Already applied' })
  }

  try {
    console.log(JobID)
    console.log(UserID)

    const job = await PostedJob.findById(JobID)
    if (!job) {
      res.status(404).json({ message: 'Job not found' })
    }

    const AppliedJob = new AppliedJobs({
      jobid: JobID,
      userid: UserID,
      empid:EmpID,
      AppliedDate :new Date().toLocaleDateString(),
      AppliedTime:new Date().toLocaleTimeString(),    })

    await AppliedJob.save()

    res.status(201).json({ message: 'Application submitted successfully!' })
  } catch (error) {
    res.status(404).json({ error })
  }
}
