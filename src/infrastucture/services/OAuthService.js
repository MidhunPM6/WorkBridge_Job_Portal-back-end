import axios from 'axios'
class OAuthService {
  constructor(env = process.env) {
    this.clientSecret = env.GOOGLE_CLIENT_SECRET;
    this.redirectUri = env.REDIRECT_URI;
    this.clientId = env.GOOGLE_CLIENT_ID;
    this.tokenUrl = env.OAUTH_TOKEN_URL;
  }

  async handleOAuth(code, codeVerifier) {
    if (!code || !codeVerifier) {
      throw new Error("Code or codeVerifier is missing");
    }

    try {
      
      const tokenResponse = await axios.post(
        this.tokenUrl,
        new URLSearchParams({
          grant_type: "authorization_code",
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          redirect_uri: this.redirectUri,
          code_verifier: codeVerifier,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      const { access_token } = tokenResponse.data;

      if (!access_token) {
        throw new Error("Failed to retrieve access token");
      }

   
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      const userInfo = userInfoResponse.data;

      if (!userInfo) {
        throw new Error("Failed to retrieve user info");
      }

 
      return {
        access_token,
        user: {
          id: userInfo.sub,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
        },
      };

    } catch (error) {
      console.error("OAuth service error:", error.message);
      throw new Error("Failed to handle OAuth process");
    }
  }
}

export default OAuthService;