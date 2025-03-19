import { UserAuthUsecase } from '../../../infrastucture/config/container.js'

export const signUpController = async (req, res) => {
  try {
    const user = await UserAuthUsecase.excute(req.body)

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
