import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Stripe from 'stripe';
import express from 'express'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


// placing user order for frontend

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173"
    let { userId, items, amount, address } = req.body;

    const newOrder = new Order({
        userId: userId,
        items: items,
        amount: amount,
        address: address,
    })
    await newOrder.save()
    await User.findByIdAndUpdate({ _id: req.body.userId }, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
        price_data: {
            currency: "inr",
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100 * 80
        },
        quantity: item.quantity
    }))

    line_items.push({
        price_data: {
            currency: "inr",
            product_data: {
                name: "Delivery"
            },
            unit_amount: 5 * 100 * 80
        },
        quantity: 1
    })

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })
    res.json({ success: true, session_url: session.url }) //8:23

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    if (success == 'true') {
        await Order.findByIdAndUpdate(orderId, { payment: true })
        res.json({ success: true, message: "payment successful" })
    }
    else {
        await Order.findByIdAndDelete(orderId);
        res.json({ success: false, message: "payment failed" })
    }
}

// user order
const userOrder = async (req, res) => {
    if(!await Order.deleteMany({payment:false})){
        res.json({ success: true, message:"error" })
    }
    const orders = await Order.find({ userId: req.body.userId })
    res.json({ success: true, data: orders })

}

// listing order for admin Panel 
const listingOrder = async (req, res) => {
    if(!await Order.deleteMany({payment:false})){
        res.json({ success: true, message:"error" })
    }
    const listOrders = await Order.find();
    // console.log(listOrders)
    res.json({ success: true, data: listOrders })
}

// api for update order status 
const updateStatus = async (req, res) => {
    await Order.findByIdAndUpdate({ _id: req.body.orderId }, { status: req.body.status })
    res.json({ success: true, message: "status Updated" })
}

// get one order by orderId 
const getOrder = async (req, res) => {
    const order = await Order.findById(req.body.orderId)
    res.json({ success: true, data: order })
}
const updateOrder = async (req, res) => {
    
    const { firstName, lastName, email, street, city, pincode, state, country, phone, status, orderId } = req.body
    const address ={firstName:firstName, lastName:lastName, email:email, street:street, city:city, pincode:pincode, state:state, country:country, phone:phone}
    const data=await Order.findByIdAndUpdate({_id: req.body.orderId},{address:address,status:status})
    
    res.json({ success: true, message: "updated order" })


}

export { placeOrder, verifyOrder, userOrder, listingOrder, updateStatus, getOrder, updateOrder };

