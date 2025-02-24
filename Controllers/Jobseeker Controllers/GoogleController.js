const { OAuth2Client } = require('google-auth-library')
const { findOne } = require('../../Models/User')
const User = require('../../Models/User')
const jwt = require('jsonwebtoken')

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
)
exports.googleAuth = async (req, res) => {
  const { token } = req.body
   
   
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:process.env.GOOGLE_CLIENT_ID
    })
 
    const payload = ticket.getPayload()
    const { email, name, picture ,sub} = payload

    
  
    //Saving data

    let user = await User.findOne({ email })
    if (!user) {
        user = new User({
        email,
        name,
        picture,
        googleId: sub,
        mobile: '000000000', 
        password: 'google-auth', 
      });
      await user.save()
    }

               

    // creating jwt token and cookie session

    const jwtToken = jwt.sign({ userID: user._id }, process.env.JWT_TOKEN, {
      expiresIn: '30m'
    })

    res.cookie('jwt', jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    })

    res.status(200).json({message : "Google login Successfull",User:user , Username:user.name})
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error occured ' })
  }
}
