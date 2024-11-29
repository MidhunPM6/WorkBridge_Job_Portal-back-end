const EmpUser=require('../Models/EmpUser')
const bcrypt =require('bcrypt')

//Register
exports.empSignup=async(req,res)=>{

    const {name,email,password}=req.body
     const existingUser=await EmpUser.findOne({email})

     if(existingUser){
        return res.status(400).json({message:"User Already Registered"})
     }
    try {
        
         const hashedPassword = await bcrypt.hash(password ,10)
         const Empuser=new EmpUser({
            name:name,
            email:email,
            password:hashedPassword,

         })
         const resullt= await Empuser.save()
         res.status(201).json({
            message:"Sign up Successfull",
            User:{id:resullt._id,name:resullt.name,email:resullt.email}
         })
        
    } catch (error) {
        res.status(500).json({message:"Server Error"})
        console.log(error);
        
    }

}

//Login 
exports.empLogin=async(req,res)=>{
    const {email,password}=req.body

    const user=await EmpUser.findOne({email})
    if(user && await bcrypt.compare(password,user.password)){
        res.status(200).json({message : " Login Successfully"})
    }else{
        res.status(400).json({message: "Invalid Credentials"})
    } 


}