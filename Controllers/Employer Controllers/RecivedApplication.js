const mongoose = require('mongoose')
const AppliedJobs = require('../../Models/Appliedjob')

exports.fetchRecivedApplication = async (req, res) => {
  const { currentEmpID } = req.body

  try {
    console.log(currentEmpID)
    if (!currentEmpID || !mongoose.Types.ObjectId.isValid(currentEmpID)) {
      return res.status(400).json({ message: 'Invalid Employer ID provided.' })
    }
    const Application = await AppliedJobs.find({ empid: currentEmpID })
      .populate('jobid', 'tittle location ' )
      .populate('userid', 'name email mobile ')
      .exec()

    console.log(Application)  

    if (Application.length === 0) {
      return res
        .status(404)
        .json({ message: 'No applications found for this employer.' })
    }

    return res.status(200).json({ Application })
  } catch (error) {
    console.error('Error fetching applications:', error)
    return res.status(500).json({ message: error.message })
  }
}
