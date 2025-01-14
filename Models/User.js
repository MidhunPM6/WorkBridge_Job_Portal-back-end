const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,   
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true

    },

    mobile:{
        type:String,
        required:true
    },
    resume: {
         type: mongoose.Schema.Types.ObjectId, 
         required:true,
         ref: 'Resume' 
        }

})

const User=  mongoose.model('User',UserSchema)
User.createIndexes() 

module.exports=User 