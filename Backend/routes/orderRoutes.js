import express from "express"
import isAuth from "../middleware/isAuth.js";
import {AllOrder, placeOrder, placeOrderRazorpay, updateStatus, userOrders, verifyrazorpay } from "../controller/orderController.js"
import adminAuth from "../middleware/AdminAuth.js";

const orderRoutes=express.Router()
// users Order
 orderRoutes.post("/placeorder",isAuth,placeOrder)
 orderRoutes.post("/razorpay",isAuth,placeOrderRazorpay)
 orderRoutes.post("/userorder",isAuth,userOrders)
  orderRoutes.post("/verifyrazorpay",isAuth,verifyrazorpay)

// Admin Orders 
orderRoutes.post("/list",adminAuth,AllOrder)
orderRoutes.post("/status",adminAuth,updateStatus)
export default orderRoutes;