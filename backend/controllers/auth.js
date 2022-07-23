import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'

export const signup = async (req,res)=>{
    const {password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({...req.body,password: hash});
        await newUser.save();
        res.status(201).send('user has been created');
    } catch (error) {
        console.log(error)
    }
}