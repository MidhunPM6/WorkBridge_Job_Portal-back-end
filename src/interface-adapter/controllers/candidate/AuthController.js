import authContainer from '../../../infrastructure/containers/authContainer.js'

const { OAuthUsecase, signupUseCase, loginUseCase, logoutUseCase } =
  authContainer()

// Creating new user to the database
export const signUpController = async (req, res) => {
  const { name, email, password, role } = req.body
  console.log(role)

  try {
    const user = await signupUseCase.execute(name, email, password, role)

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
  const { email, password, role } = req.body

  try {
    const candidateData = await loginUseCase.execute(email, password, role)

    const { token, account } = candidateData
    console.log(account)

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 12000000
    })

    return res
      .status(200)
      .json({ success: true, message: 'Login Successfull', account })
  } catch (error) {
    console.error(error.message)

    return res
      .status(500)
      .json({ success: false, message: error.message || 'Server Error' })
  }
}

// Google authentication using PKCE + OAuth 2.0
export const OAuthController = async (req, res) => {
  const { code, codeVerifier, role } = req.body
  console.log(role)

  try {
    const response = await OAuthUsecase.execute(code, codeVerifier, role)

    const { user, jwtToken } = response

    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
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
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    })

    return res.status(200).json(response.message)
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ message: 'Server Error' })
  }
}
