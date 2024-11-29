const mongoose = require('mongoose')

const EmpUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const EmpUser = mongoose.model('EpmUser', EmpUserSchema)
EmpUser.createIndexes()
module.exports = EmpUser
