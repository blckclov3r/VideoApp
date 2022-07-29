import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../error.js";

export const signup = async (req,res,next)=>{
    const {password} = req.body;
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // updating password to hash
        const newUser = new User(
            {
                ...req.body,
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-SJEWBFE4t685cgNnpxFumHYvUWk_Z71-A&usqp=CAU",
                password: hash
            }
        );
        await newUser.save();
        res.status(201).send('user has been created');
    } catch (error) {
        next(error)
        // next(createError(404,,"Not found, sorry!"))
    }
}
export const signin = async (req,res,next)=>{

    try {
        const user = await User.findOne({name: req.body.name});
        if(!user){
            // throw new Error("User not found!");
            return next(createError(404,'User not found'))
          
        }
        const isCorrect = bcrypt.compareSync(req.body.password, user.password); // true
        if(!isCorrect){
            return next(createError(404,'Wrong credentials'))
        }
    
       const token = jwt.sign({id: user._id},process.env.JWT);
       // taking out the password 
       const {password,...others} = user._doc;

       res.cookie("access_token",token,{
        httpOnly: true
       }).status(200).json(others);
     
    } catch (error) {
        next(error)
    }
}

export const googleAuth = async (req,res,next)=>{
    try {
        const user = await User.findOne({email: req.body.email})
        // console.log('google auth',user)
        if(user){
            const token = jwt.sign({id: user._id},process.env.JWT);
            res.cookie("access_token",token,{
                httpOnly: true
            }).status(200).json(user);
            // console.log('user',user)
        }else{
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            });
            const savedUser = await newUser.save();
            // console.log('savedUser',savedUser)
            const token = jwt.sign({id: savedUser._id},process.env.JWT);
            res.cookie("access_token",token,{
                httpOnly: true
            }).status(200).json(savedUser);
        }
    } catch (error) {
        next(error)
    }
}