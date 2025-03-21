import candidateContainer from '../../../infrastucture/containers/candidateContainer.js'
import OAuthContainer from '../../../infrastucture/containers/OAuthContainer.js'

const { signUpUseCase, logInUseCase } = candidateContainer()
const { OAuthUsecase} = OAuthContainer()


// Creating new user to the database
export const signUpController = async (req, res) => {
  try {
    console.log(req.body)
    const user = await signUpUseCase.execute(req.body)

    if (user.message === 'User already exists') {
      return res.status(400).json({
        message: user.message,
        user
      })
    }
    return res.status(201).json({
      message: user.message,
      user
    })
  } catch (error) {
    res.status(404).json(error)
    console.error(error)
  }
}

//Login the user from the database

export const loginController = async (req, res) => {
  try {
    const candidateData = await logInUseCase.execute(req.body)

    const { token, candidate } = candidateData

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge : "120000"
    })
    res.status(200).json({ message: 'Login Successfull', candidate })
  } catch (error) {
    console.error(error.message);
    
    res.status(500).json({message:"Server Error"})
  }
}


export const OAuthController=async(req,res)=>{
   const {code,codeVerifier} =req.body 
    try {
      const response = await OAuthUsecase.execute(code,codeVerifier)
      console.log(response)
      res.status(200).json({response : response})
    } catch (error) {
      console.error(error);
      res.status(404).json(error.message)
      
    }
     

  
}
