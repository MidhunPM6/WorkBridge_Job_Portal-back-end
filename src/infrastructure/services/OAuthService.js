import axios from 'axios'

class OAuthService {
  constructor (env = process.env) {
    this.clientSecret = env.GOOGLE_CLIENT_SECRET
    this.redirectUri = env.REDIRECT_URI
    this.clientId = env.GOOGLE_CLIENT_ID
    this.tokenUrl = env.OAUTH_TOKEN_URL
    this.usedCodes = new Set() // Track used codes to prevent reuse
  }

  async handleOAuth (code, codeVerifier, receivedTimestamp = Date.now()) {
    if (!code || !codeVerifier) {
      throw new Error('Code or codeVerifier is missing')
    }

    // Check if code was already used
    if (this.usedCodes.has(code)) {
      throw new Error(
        'Authorization code has already been used. Please restart OAuth flow.'
      )
    }
    this.usedCodes.add(code)

    // Check if code is expired (Google codes expire in 5-10 minutes)
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000
    if (receivedTimestamp < fiveMinutesAgo) {
      throw new Error(
        'Authorization code has expired. Please restart OAuth flow.'
      )
    }

    try {
      console.log('OAuth Request Analysis:', {
        timestamp: new Date().toISOString(),
        codeReceivedTime: new Date(receivedTimestamp).toISOString(),
        codeAgeMs: Date.now() - receivedTimestamp,
        codeLength: code.length,
        codeVerifierLength: codeVerifier.length,
        codeVerifierHasTilde: codeVerifier.includes('~'),
        codeStartsWith: code.substring(0, 10) + '...'
      })

      const params = [
        `grant_type=authorization_code`,
        `client_id=${encodeURIComponent(this.clientId)}`,
        `client_secret=${encodeURIComponent(this.clientSecret)}`,
        `code=${encodeURIComponent(code)}`,
        `redirect_uri=${encodeURIComponent(this.redirectUri)}`,
        `code_verifier=${codeVerifier}`
      ].join('&')

      console.log(
        'Final Request Body (first 200 chars):',
        params.substring(0, 200)
      )

      const tokenResponse = await axios.post(this.tokenUrl, params, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json'
        },
        timeout: 10000
      })

      console.log('Google OAuth Success:', tokenResponse.data)

      const { access_token } = tokenResponse.data

      if (!access_token) {
        throw new Error('Failed to retrieve access token')
      }

      const userInfoResponse = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${access_token}`
          },
          timeout: 10000
        }
      )

      const userInfo = userInfoResponse.data

      if (!userInfo) {
        throw new Error('Failed to retrieve user info')
      }

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
      // Clean up used codes set on error
      this.usedCodes.delete(code)

      console.error('COMPREHENSIVE OAUTH ERROR ANALYSIS:', {
        timestamp: new Date().toISOString(),
        errorType: error.response?.data?.error,
        errorDescription: error.response?.data?.error_description,
        statusCode: error.response?.status,
        requestUrl: error.config?.url,
        requestMethod: error.config?.method,
        requestData: error.config?.data
          ? error.config.data.substring(0, 300)
          : null,
        responseHeaders: error.response?.headers
      })

      if (error.response?.data?.error === 'invalid_grant') {
        // Most common causes
        if (
          error.response.data.error_description?.includes('expired') ||
          error.response.data.error_description === 'Bad Request'
        ) {
          throw new Error(
            'Authorization code has expired or is invalid. Please completely restart the OAuth flow and use a fresh code.'
          )
        }

        if (error.response.data.error_description?.includes('redirect_uri')) {
          throw new Error(
            'Redirect URI mismatch. Please verify your Google Cloud Console configuration matches exactly: ' +
              this.redirectUri
          )
        }

        if (error.response.data.error_description?.includes('verifier')) {
          throw new Error(
            'PKCE code verifier mismatch. Please check your frontend code challenge generation matches the code verifier.'
          )
        }

        throw new Error(
          'Google OAuth error: ' +
            (error.response.data.error_description || 'Invalid grant')
        )
      }

      throw new Error('OAuth process failed: ' + error.message)
    }
  }
}

export default OAuthService
