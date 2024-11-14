import foodModel from '../models/foodModel.js';
import fs from 'fs' ; // prebuild in node js fs= file system


// add food item
const addFood = async (req,res)=>{
    let {name,description,price,category,rating} =req.body;
    let image_fileName = `${req.file.filename}`;

    const food = new foodModel({
        name:name,
        description:description,
        price:price,
        category:category,
        image:image_fileName,
        rating:rating
    })
    try {
        await food.save();
        res.json({success:true,message:"item added"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"error"});
    }
}

// all item list
const foodList = async(req,res,next)=>{ // 4:14:23
    let items = await foodModel.find() 
    res.json({success:true ,data:items})

}

//remove food item 
const deletefood = async(req,res,next)=>{
    let item = await foodModel.findById(req.body.id)
    fs.unlink(`uploads/${item.image}` ,()=>{}) 
    let food=await foodModel.findByIdAndDelete(req.body.id)
    
    res.json({success:true , message:item.image})

}

// get one food item
const getfood = async (req,res) => {
    const item = await foodModel.findById(req.body.id)
    res.json({success :true ,data:item})
}
// update or edit item
const editFood = async (req,res)=>{
    const {_id,name,description,price,category}= req.body
    let image_fileName = `${req.file.filename}`;
    const item = await foodModel.findByIdAndUpdate({_id:_id},{name:name,description:description,price:price,category:category,image:image_fileName},{new:true})
    // console.log(_id,image_fileName)
    // console.log(name,description)
    // console.log(price,category)
    // console.log(item)
    res.json({success:true ,message:"item updated"})
    
}

export {addFood ,foodList,deletefood,getfood ,editFood} ;