import User from "../models/userModel.js"

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import validator from 'validator';

// user login

const loginUser = async(req,res)=>{
    const {email ,password } = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.json({success:false , message:"user email doesn't exist"})
    }
    const isMatch = await bcrypt.compare(password ,user.password)
    if(!isMatch){
        return res.json({success:false , message : "Invalid credentials"})
    }
    const token = createJwtToken(user._id)
    return res.json({success:true ,token})

}

const createJwtToken = (id)=>{
    return jwt.sign({id} , process.env.TWT_SECRET)
}
//user Register

const signInUser = async(req,res)=>{
    const {name ,email,password ,cartData} = req.body ;
    const userExist = await User.findOne({email});
    if(userExist){
        return res.json({sucess:false ,message:"User email already registered "})
    }
    if(!validator.isEmail(email)){
        return res.json({success:false ,message:"Not Valid Email ! please enter valid email "})
    }
    if(password.length <8){
        return res.json({success:false ,message:"password must be minimum 8 charecter"})
    }

    // add addition salt in password
    const salt = await bcrypt.genSalt(10);

    // to hash password by bcrypt
    const hashPassword = await  bcrypt.hash(password ,salt);

    const newUser = new User({
        name:name,
        email:email,
        password:hashPassword,
    })
    const user = await  newUser.save();
    // console.log(user);
    //https://chatgpt.com/share/671503f6-0ac0-8012-9da4-313e758215bc => read about jwt token 
    const token = createJwtToken(user._id)
    res.json({success:true ,token})

}

export {loginUser,signInUser};
