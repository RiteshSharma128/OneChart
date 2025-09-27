import mongoose from "mongoose";

const connnectDb=async()=>{
  try{
     await mongoose.connect(process.env.MONGODB_URL)
     console.log("db Connected")
  }catch(error){
 console.log("db Connected")
  }
  
}

export default connnectDb;

