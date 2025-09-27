import express from "express"
import isAuth from "../middleware/isAuth.js";
import { addTocart, getUsercart, UpdateCart } from "../controller/CartController.js";
const cartRoutes=express.Router()
cartRoutes.post("/get",isAuth,getUsercart)
cartRoutes.post("/add",isAuth,addTocart)
cartRoutes.post("/update",isAuth,UpdateCart)
export default cartRoutes;