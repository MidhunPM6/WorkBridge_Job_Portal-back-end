import candidateContainer from '../../../infrastucture/containers/candidateContainer.js'
import OAuthContainer from '../../../infrastucture/containers/OAuthContainer.js'

const { signUpUseCase, logInUseCase, logoutUseCase } = candidateContainer()
const { OAuthUsecase } = OAuthContainer()

// Creating new user to the database
export const signUpController = async (req, res) => {
  const { name, email, password } = req.body
  try {
    console.log(req.body)
    const user = await signUpUseCase.execute(name, email, password)

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
    res.status(500).json({ message: ' Server Error' })
    console.error(error)
  }
}

//Login the user from the database
export const loginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const candidateData = await logInUseCase.execute(email, password)

    const { token, candidate } = candidateData

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 12000000
    })
    return res.status(200).json({ message: 'Login Successfull', candidate })
  } catch (error) {
    console.error(error.message)

    return res.status(500).json({ message: 'Server Error' })
  }
}

// Google authentication using PKCE + OAuth 2.0
export const OAuthController = async (req, res) => {
  const { code, codeVerifier } = req.body
  try {
    const response = await OAuthUsecase.execute(code, codeVerifier)
    console.log(response)
    const { user, jwtToken } = response

    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      maxAge: 12000000
    })

    return res.status(200).json({ user })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

//  Logout Controller
export const logoutController = async (req, res) => {
  const token = req.cookies.jwt
  console.log(token)

  try {
    if (!token) {
      return res.status(400).json({ message: 'Token not yet received' })
    }

    const response = await logoutUseCase.execute()
    console.log(response.message)
    res.clearCookie("jwt", { httpOnly: true, secure: false, sameSite: "Strict" });

    return res.status(200).json(response.message)

  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Server Error' })
  }
}
