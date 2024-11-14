import User from '../models/userModel.js'

// Add item in cart

const addToCart = async (req, res) => {
    const userData = await User.findOne({ _id: req.body.userId });
    const cartData = userData.cartData;
    if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
    }
    else {
        cartData[req.body.itemId] += 1
    }
    // console.log(cartData[req.body.itemId]);

    await User.findByIdAndUpdate({ _id: req.body.userId }, { cartData });
    res.json({ success: true, message: "Item Added in Cart" });
}

// remove item from cart 
const removeFromCart = async (req, res) => {
    const userData =await User.findOne({_id:req.body.userId})
    const cartData = userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1
    }
    if(cartData[req.body.itemId]==0 ){
        delete cartData[req.body.itemId]
    }
    await User.findByIdAndUpdate({ _id: req.body.userId }, { cartData });

    res.json({ success: true, message: "Item Removed in Cart" });


}

const getCartItems = async (req, res) => {
    const userData =await User.findOne({_id:req.body.userId})
    const cartData = userData.cartData;
    
    res.json({success:true ,cartData}) //7:27
}

export { addToCart, removeFromCart, getCartItems }