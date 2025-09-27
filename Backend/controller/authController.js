// yaha par ham auth ke liye use kiye hai

import User from "../model/userModel.js";
import validator from "validator";
import bcrypt, { genSalt } from "bcryptjs"
import { getToken, getToken1 } from "../config/token.js";

export const registeration=async(req,res)=>{
  try{
  const {name,email,password}=req.body;
  const existUser= await User.findOne({email})
  if(existUser){
    return res.status(400).json({message:"User already exist"})
  }
  if(!validator.isEmail(email)){
    return res.status(400).json({message:"Enter Valid Email"})
  }
  if(password.length<8){
    return res.status(400).json({message:"Enter strong password"})
  }
  let hashPassword=await bcrypt.hash(password,10)
  const user=await User.create({name,email,password:hashPassword})
  let token=await getToken(user._id)
  res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    maxAge:7*24*60*60*1000
  })
  return res.status(201).json(user)
  }catch(error){
  console.log("registeration error")
  return res.status(500).json({message:`registeration Error ${error}`})
  }
}

export const login=async(req,res)=>{
  try{
  let {email,password}=req.body;
  let user=await User.findOne({email})
    if(!user){
    return res.status(404).json({message:"User not found"})
    }

    let isMatch=await bcrypt.compare(password,user.password)
      if(!isMatch){
      return res.status(400).json({message:"Incorrect password"})
      }
      let token=await getToken(user._id)
       res.cookie("token",token,{
       httpOnlt:true,
       secure:true,
       sameSite:"none",
       maxAge:7*24*60*60*1000
  })
      return res.status(201).json({message:"login successfully"})
  }catch(error){
      console.log("login error")
      return res.status(500).json({message:`Login error ${error}`})
  }
}

export const logOut=async(req,res)=>{
  try{
   res.clearCookie("token")
   return res.status(200).json({message:"logOut successfully"})
  }catch(error){
    console.log("logOut error")
  return res.status(500).json({message:`LogOut error ${error}`})
  }
}

export const googleLogin=async(req,res)=>{
  try{
  let {name,email}=req.body;
  let user=await User.findOne({email})
    if(!user){
      user=await User.create({
        name,email
      })
    }
      let token=await getToken(user._id)
       res.cookie("token",token,{
       httpOnlt:true,
       secure:true,
       sameSite:"none",
       maxAge:7*24*60*60*1000
  })
      return res.status(200).json({message:"login successfully"})
  }catch(error){
   console.log("googleLogin error")
      return res.status(500).json({message:`googleLogin error ${error}`})
  }
}

export const adminLogin=async(req,res)=>{
  try{
    let {email,password}=req.body
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
       let token=await getToken1(email)
     res.cookie("token",token,{
    httpOnly:true,
    secure:true,
    sameSite:"none",
    maxAge:1*24*60*60*1000
  })
  return res.status(201).json(token)
   }
   return res.status(400).json({message:"Invild Creadintials"})
  }catch(error){
   console.log("Dmin login error")
      return res.status(500).json({message:`Admin login error ${error}`})
  }
}
