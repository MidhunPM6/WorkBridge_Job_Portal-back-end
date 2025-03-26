import candidateContainer from '../../../infrastucture/containers/candidateContainer.js'


const { profileUploadUseCase } = candidateContainer()

export const profileFileUpload = async (req, res) => {
 
  const file = req.file
  const userID = req.userID


  if (!req.userID) {
    return res.status(404).json({ message: 'UserID not provided ' })
  }
  if (!req.file) {
    return res.status(404).json({ message: 'File not provided ' })
  }

  try {
    const uploadFile = await profileUploadUseCase.execute({file,userID})

    res.status(200).json({message : "File saved successfully"})
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Server Error' })
  }
}
