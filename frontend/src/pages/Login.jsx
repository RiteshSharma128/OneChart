import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import google from "../assets/google.png";
import { IoEyeSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { authDataContext } from "../context/authContext";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/Firbase";
import { userDataContext } from "../context/UserContext";
function Login(){
  const navigate = useNavigate();
  const [Show, setShow] = useState(false);
  let [email,setemail]=useState("")
  let [password,setpassword]=useState("") 
  let {serverUrl}=useContext(authDataContext)
  let {getCurrentUser}=useContext(userDataContext)

  const handleLogin=async(e)=>{
     e.preventDefault();
    try{
     const result=await axios.post(serverUrl + '/api/auth/login',{
      email,password
     },{withCredentials:true})
      console.log(result.data)
      getCurrentUser()
      navigate("/")
    }catch(error){
     console.log(error)
    }
  }

  const googlelogin= async () => {
    try{
    const response = await signInWithPopup(auth, provider);
    let user = response.user;
    let name=user.displayName;
    let email=user.email
    const result=await axios.post(serverUrl+'/api/auth/googlelogin',{name,email},{withCredentials:true})
    console.log(result.data)
    getCurrentUser()
    navigate("/")
    }catch(error){
     console.log(error)
    }
  }
 
   return (
     <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex flex-col items-center justify-start">
       <div
         className="w-full h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer"
         onClick={() => navigate("/")}
       >
         <img className="w-[40px]" src={Logo} alt="" />
         <h1 className="text-[22px] font-sans">OneCart</h1>
       </div>
 
       <div className="w-full h-[100px] flex items-center justify-center flex-col gap-[10px]">
         <span className="text-[25px] font-semibold">Registration Page</span>
         <span className="text-[16px]">Welcome to OneCart, Place your Order</span>
       </div>
 
       <div className="max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border border-[#96969635] backdrop-blur-2xl rounded-lg shadow-lg flex items-center justify-center">
         <form action="" onSubmit={handleLogin} className="w-[90%] h-[90%] flex flex-col items-center justify-start gap-[20px]">
           {/* Google button */}
           <div className="w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center justify-center gap-[10px] py-[20px] cursor-pointer" onClick={googlelogin}>
             <img src={google} alt="" className="w-[20px]" /> Registration with Google
           </div>
 
           {/* Divider */}
           <div className="w-full h-[20px] flex items-center justify-center gap-[10px]">
             <div className="w-[40%] h-[1px] bg-[#96969635]"></div>Or
             <div className="w-[40%] h-[1px] bg-[#96969635]"></div>
           </div>
 
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
                 className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]"
                 onClick={() => setShow((prev) => !prev)}
               />
             )}
             {Show && (
               <FaEyeSlash
                 className="w-[20px] h-[20px] cursor-pointer absolute right-[5%] bottom-[55%]"
                 onClick={() => setShow((prev) => !prev)}
               />
             )}
 
             <button className="w-full h-[50px] bg-[#6060f5] rounded-lg flex items-center justify-center mt-[20px] text-[17px] font-semibold">
              Login
             </button>
 
             <p className="flex gap-[10px]">
               You have not any account?
               <span
                 className="text-[#5555f6cf] text-[17px] font-semibold cursor-pointer"
                 onClick={() => navigate("/signup")}
               >
                 Create New Account
               </span>
             </p>
           </div>
         </form>
       </div>
     </div>
   );
}

export default Login