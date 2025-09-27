import express from "express"
import { adminLogin, googleLogin, login, logOut, registeration } from "../controller/authController.js"

const authRoutes=express.Router()
authRoutes.post("/registeration",registeration)
authRoutes.post("/login",login)
authRoutes.get("/logOut",logOut)
authRoutes.post("/googlelogin",googleLogin)
authRoutes.post("/adminlogin",adminLogin)

export default authRoutes;