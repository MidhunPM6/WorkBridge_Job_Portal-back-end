import IUserRepository from '../../domain/repositories/IUserRepository.js'
import { User } from '../database/UserModel.js'
import bcrypt from 'bcrypt'

export default class UserRepository extends IUserRepository {

  async create (userEntity) {
    const hashedPassword = await bcrypt.hash(userEntity.password, 10)

    const user = new User({
      name: userEntity.name,
      email: userEntity.email,
      password: hashedPassword
    })

    return await user.save()
    
  }

  async findByEmail (email) {
    return await User.findOne({email})
  }
} 
