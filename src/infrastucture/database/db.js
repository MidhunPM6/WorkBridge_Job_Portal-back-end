import mongoose from "mongoose";

const   connectDB = () =>{
    mongoose.connect('mongodb://localhost:27017/',{
        dbName : 'workBridge'
    }).then(()=>{
        console.log("MongoDB connected");
    })
}

export default connectDB()
 
