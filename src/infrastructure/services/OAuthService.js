import { OAuth2Client } from 'google-auth-library'

class OAuthService {
  constructor (env = process.env) {
    this.clientId = env.GOOGLE_CLIENT_ID
    this.client = new OAuth2Client(this.clientId)
  }

  async handleOAuth (token) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.clientId
      })
      const payload = ticket.getPayload()
      return payload
    } catch (error) {
      throw new Error('Unable to fetch the user ')
    }
  }
}

export default OAuthService
