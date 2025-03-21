import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

export const handleOAuthServices = async (code, codeVerifier) => {
  const {
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI,
    GOOGLE_CLIENT_ID,
    OAUTH_TOKEN_URL
  } = process.env

  if (!code || !codeVerifier) {
    throw new Error('code or codeVerifier is missing ')
  }
  try {
    const response = await axios.post(
      OAUTH_TOKEN_URL,
      new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        code_verifier: codeVerifier
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }
    )

    const { access_token } = response.data

    if (!access_token) {
      throw new Error('Failed to retrieve access token')
    }

    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    )

    const userInfo = userInfoResponse.data

    return {
      access_token,
      user: {
        id: userInfo.sub,
        name: userInfo.name,
        email: userInfo.email,
        picture: userInfo.picture
      }
    }
  } catch (error) {
    console.error('OAuth service error:', error.message)
    throw new Error('Failed to exchange token or fetch user info')
  }
}
