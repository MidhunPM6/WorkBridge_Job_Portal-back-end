import { response } from 'express'
import UserEntity from '../../../domain/entities/canditate/UserEntity.js'

export default class UserAuthUseCase {
  constructor (userRepository) {
    this.userRepository = userRepository
  }
  excute = async data => {
    try {
      // Checking the existing user
      const existingUser = await this.userRepository.findByEmail(data.email)

      if (existingUser) {
        return {
          message: 'User already exists',
          user: existingUser
        }
      }

      //Creating new user
      const userEntity = new UserEntity(data)
      const newUser = await this.userRepository.create(userEntity)

      return {
        success: true,
        newUser,
        message: 'User successfully registered'
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
