import jwt from 'jsonwebtoken'
import { createError } from './error.js';

export const verifyToken = (req,res,next)=>{

    const token = req.cookies.access_token;


    if(!token){
        return next(createError(401,'You are not auntheticated'));
    }
    // verify a token symmetric
    jwt.verify(token, process.env.JWT, (err,user)=>{
        // console.log('user',user)
        if(err){
            return next(createError(403,'Your token is not valid!!!')); 
        }
        req.user =  user;
        // console.log('req.user ====> ',req.user)
        // console.log('user ====> ',user)
        next()
    });
}