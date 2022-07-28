import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js'
import commentRoutes from './routes/comments.js'
import videoRoutes from './routes/videos.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
console.log(path.join(__dirname,'../frontend/build'))

dotenv.config();

const app = express();
app.use(cors());





app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/videos", videoRoutes);

// middleware
app.use((err,req,res,next)=>{
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        success: false,
        status,
        message,
    });
});


// serve frontend
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*',(req,res)=>{
        return res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
    })
}else{
    app.get('/',(req,res)=>res.send('Please set to production'))
}

const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`mongoose connected | port: ${PORT}`);
    });
}).catch((err)=>{
    throw err;
});