import bcrypt from 'bcrypt'

export default class PasswordServices {
  constructor (saltRounds = 10) {
    this.saltRounds = 10
  }
  async hash(password) {
    if (!password) {
        throw new Error('Password is required for hashing.')
    }
    return await bcrypt.hash(password, this.saltRounds)
}

async comparePassword(password, hashedPassword) {
    if (!password || !hashedPassword) {
        throw new Error('Both password and hash are required for comparison.')
    }

    return await bcrypt.compare(password, hashedPassword)
}
}
