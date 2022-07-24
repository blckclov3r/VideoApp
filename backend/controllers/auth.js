import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { createError } from "../error.js";

export const signup = async (req,res,next)=>{
    const {password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // updating password to hash
        const newUser = new User({...req.body,password: hash});

        await newUser.save();
        res.status(201).send('user has been created');
    } catch (error) {
        next(error)
        // next(createError(404,,"Not found, sorry!"))
    }
}
export const signin = async (req,res,next)=>{
    const {password, name} = req.body;
    try {
        const user = await User.findOne({name: name});
        if(!user){
            // throw new Error("User not found!");
            return next(createError(404,'User not found'))
          
        }
        const isCorrect = bcrypt.compareSync(password, user.password); // true
        if(!isCorrect){
            return next(createError(404,'Wrong credentials'))
        }
        
       
    } catch (error) {
        next(error)
    }
}