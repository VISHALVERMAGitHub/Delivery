import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import 'dotenv/config' 
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";






//  app config
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDb();

//  api endpoints

app.use("/api/food", foodRouter);
app.use("/image", express.static('uploads'))
app.use("/api/user", userRouter);
app.use('/api/cart' ,cartRouter);
app.use('/api/order' , orderRouter);


app.get("/", (req, res) => {
    res.send("home working")
})
app.listen(4000, () => {
    console.log("server listen on port http://localhost:4000")
})

app.use((err, req, res, next) => {
    let { status = 500, message = "some thing wrong" } = err;
    console.log(status, message);
    next();
})



