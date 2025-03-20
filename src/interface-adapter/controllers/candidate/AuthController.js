
import candidateContainer from '../../../infrastucture/config/candidateContainer.js'


const {signUpUseCase} = candidateContainer()

// Creating new user to the database
export const signUpController = async (req, res) => {
  try {
    console.log(req.body)
    const user = await signUpUseCase.excute(req.body) 
    
    if (user.message === 'User already exists') {
      return res.status(400).json({
        message: user.message,
        user
      })
    }
    return res.status(201).json({
      message: user.message,
      user,
    }) 
  } catch (error) {
    res.status(404).json(error) 
    console.error(error)
  }
}

//Login the user from the database

export const loginController =async(req,res)=>{

}
