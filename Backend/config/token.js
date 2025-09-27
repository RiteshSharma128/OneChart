//  ham ak token generat karenge jo cookies me jayega 
import jwt  from "jsonwebtoken"

export const getToken=async(userId)=>{
  try{
  const token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
  return token
  }catch(error){
  console.log("token error")
  }
}


export const getToken1=async(email)=>{
  try{
  const token=await jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"})
  return token
  }catch(error){
  console.log("token error")
  }
}