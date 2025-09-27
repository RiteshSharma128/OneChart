// ye detabase se connect hota hai model hamara  
import mongoose from "mongoose";
// deta base se ak schema banayenge

const userSchema=new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  email:{
    type:String,
    require:true,
    unique:true
  },
  password:{
    type:String
  },
  cartData:{
    type:Object,
    default:{}
  }
},{timestamps:true,minimize:false})

const User=mongoose.model("User",userSchema)
export default User