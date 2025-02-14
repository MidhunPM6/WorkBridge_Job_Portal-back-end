const User = require('../../Models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//User Register
exports.registerUser = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'User Already Registered' })
      }
      return bcrypt.hash(req.body.password, 10)
    })
    .then(hashedPassword => {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      return user.save()
    })
    .then(result => {
      res.status(201).json({
        message: 'User Successfully Registered',
        User: { id: result._id, name: result.name, email: result.email }
      })
    })
    .catch(err => {
      console.log(err)
    })
}

//User Login
exports.LoginUser = async (req, res) => {

  const secretKey = process.env.JWT_TOKEN
  const { email, password } = req.body

  const user = await User.findOne({ email })
  try {
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials.' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
     return res.status(400).json({ message: 'Invalid Credentials.' })
    }
    const token = jwt.sign({ UserID: user._id }, secretKey, {
      expiresIn: '1h'
    })

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000
    })
    res
      .status(200)
      .json({ message: 'Login Successful!', username: user.name, user: user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

exports.LogoutUser = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict',
    path: '/'
  })
  res.status(200).json({ message: 'Logout Successfully' })
}
