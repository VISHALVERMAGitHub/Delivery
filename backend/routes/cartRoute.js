import express from 'express' ;
import { addToCart , removeFromCart , getCartItems } from '../controllers/cartController.js';
import authMiddleware from '../middleware/auth.js';
import wrapAsync from '../utils/wrapAsync.js';

const cartRouter = express.Router();

cartRouter.post("/add" ,authMiddleware, wrapAsync(addToCart));
cartRouter.post ("/remove" ,authMiddleware,wrapAsync( removeFromCart)) ;
cartRouter.post("/get" , authMiddleware , wrapAsync(getCartItems)); 

export default cartRouter ;