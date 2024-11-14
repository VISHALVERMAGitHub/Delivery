import express from 'express';
import { getOrder, listingOrder, placeOrder, updateOrder, updateStatus, userOrder, verifyOrder } from '../controllers/orderController.js';
import wrapAsync from '../utils/wrapAsync.js'
import authMiddleware from '../middleware/auth.js';
const orderRouter = express.Router()

orderRouter.post("/place" , authMiddleware ,wrapAsync(placeOrder) ) ;
orderRouter.post("/verify" ,wrapAsync(verifyOrder))
orderRouter.post("/userorder" , authMiddleware ,wrapAsync(userOrder))

orderRouter.get("/all" ,wrapAsync(listingOrder))
orderRouter.post('/status' ,wrapAsync(updateStatus))
orderRouter.post("/getorder" ,wrapAsync(getOrder))
orderRouter.post("/update" ,wrapAsync(updateOrder))
export default orderRouter ;