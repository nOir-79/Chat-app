//Package Imports
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

//File Imports
import connectToMongoDB from './db/connectToMongoDB.js';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";


//Variables
const app = express();
const PORT = process.env.PORT || 5000;

//Configuration
dotenv.config();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);
//To parse the incoming request with JSON payloads(from req.body)


//Server
app.listen(5000, () =>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`)
});