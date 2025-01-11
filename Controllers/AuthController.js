const User =require('../Models/User')
const bcrypt=require('bcrypt')

//User Register
exports.registerUser=(req,res)=>{
User.findOne({email:req.body.email}).then((existingUser)=>{
    if(existingUser){
        return res.status(400).json({message:'User Already Registered'})
    }
    return bcrypt.hash(req.body.password,10)
}).then((hashedPassword)=>{
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile,
        password:hashedPassword,
    })
    return user.save()

}).then((result)=>{
   res.status(201).json({
    message:"User Successfully Registered",
    User:{id:result._id,name:result.name,email:result.email}

   })
}).catch(err=>{

    console.log(err)


})
}

//User Login
exports.LoginUser=async(req,res)=>{

   const {email,password}=req.body
   
   const user=await User.findOne({email})

   if(user && await bcrypt.compare(password,user.password)){
    res.status(200).json({ message: "Login Successful!",username:user.name,user:user});
    
   }else{
    res.status(400).json({ message: "Invalid Credentials." });
   }
   

   } 






       



