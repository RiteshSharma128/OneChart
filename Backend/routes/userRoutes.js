import express from "express"
import isAuth from "../middleware/isAuth.js";
import { getAdmin, getCurrentUser } from "../controller/userControllers.js";
import adminAuth from "../middleware/AdminAuth.js";


const userRoutes=express.Router()
userRoutes.get("/getcurrentuser",isAuth,getCurrentUser)
userRoutes.get("/getadmin",adminAuth,getAdmin)


export default userRoutes;

