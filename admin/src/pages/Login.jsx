
import Logo from "../assets/Logo.png";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import axios from "axios"
import { useContext } from "react";
import { authDataContext } from "../Context/authContext";
import { adminDataContext } from "../Context/AdminContext";
import { useNavigate } from "react-router-dom";

function Login(){
  const [Show, setShow] = useState(false);
  let [email,setemail]=useState("")
  let [password,setpassword]=useState("")
  let {serverUrl}=useContext(authDataContext)
  let {adminData,getAdmin}=useContext(adminDataContext)
  let navigate=useNavigate()

  const AdminLogin=async(e)=>{
    e.preventDefault()
    try{
      const result =await axios.post(serverUrl + '/api/auth/adminlogin',{email,password},{withCredentials:true})
      console.log(result.data)
      getAdmin()
      navigate("/")
    }catch(error){
     console.log(error)
    }
  }
  return(
    <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
           <div
             className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer">

             <img className="w-[40px]" src={Logo} alt="" />
             <h1 className="text-[22px] font-sans">OneCart</h1>
           </div>
     
           <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
             <span className="text-[25px] font-semibold">Registration Page</span>
             <span className="text-[16px]">Welcome to OneCart, Apply to Admin login</span>
           </div>
     
           <div className="max-w-[600px] w-[90%] h-[400px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
             <form action=""onSubmit={AdminLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
              
               {/* Inputs */}
               <div className="w-[90%] h-[400px] flex flex-col items-center justify-center gap-[15px] relative">
                
                 <input
                   type="email"
                   className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
                   placeholder="Email"
                   required onChange={(e)=>setemail(e.target.value)} value={email}
                 />
     
                 <input
                   type={Show ? "text" : "password"}
                   className="w-full h-[50px] border-2 border-[#96969635] backdrop-blur-sm rounded-lg shadow-lg bg-transparent placeholder-[#ffffffc7] px-[20px] font-semibold"
                   placeholder="Password"
                   required onChange={(e)=>setpassword(e.target.value)} value={password}
                 />
                 {!Show && (
                   <IoEyeSharp
                     className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                     onClick={() => setShow((prev) => !prev)}
                   />
                 )}
                 {Show && (
                   <FaEyeSlash
                     className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[50%]"
                     onClick={() => setShow((prev) => !prev)}
                   />
                 )}
     
                 <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
                  Login
                 </button>
               </div>
             </form>
           </div>
         </div>
  )
}

export default Login

