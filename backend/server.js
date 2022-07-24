import express from 'express'
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/users.js'
import commentRoutes from './routes/comments.js'
import videoRoutes from './routes/videos.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'

dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000;

app.get("/", function (req, res) {
    res.json({msg: 'connected'})
});

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

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`mongoose connected | port: ${PORT}`);
    });
}).catch((err)=>{
    throw err;
});