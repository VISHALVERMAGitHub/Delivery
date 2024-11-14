import mongoose from "mongoose"; 

// time 3:42 mongoAtlas

export const connectDb = async ()=>{
    // await mongoose.connect("mongodb+srv://vishalverma_01:cQrqgpEKQHhuCBOD@cluster0.4gcfw.mongodb.net/FreshToYourDoor-main").then(()=>console.log("DB connected")).catch((err)=>console.log(err))
    await mongoose.connect('mongodb://127.0.0.1:27017/FreshToYourDoor-main').then(()=>console.log("DB connected")).catch((err)=>console.log(err))
}