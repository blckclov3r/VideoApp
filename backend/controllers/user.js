import { createError } from "../error.js"
import User from "../models/User.js";



export const updateUser = async(req,res,next)=>{
    console.log(req.user)
   if(req.params.id === req.user.id){
    try {
        const update = await User.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new: true})
        res.status(200).json(update)
    } catch (error) {
        next(error);
    }
   }else{
    return next(createError(403,'You can update only your account'))
   }
}


export const deleteUser = async(req,res,next)=>{
   if(req.params.id === req.user.id){
    try {
         await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(error);
    }
   }else{
    return next(createError(403,"You can delete only your account!"));
   }
}

export const getUser = async(req,res)=>{
   try {
    const user = await User.findById(req.params.id);
    const {password,...others} = user._doc;
    res.status(200).json(others);
   } catch (error) {
    next(error);
   }
}

export const subscribeUser = async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: 1}
        })
        res.status(200).json("Subscription successfully");
    } catch (error) {
        next(error);
    }
}

export const unsubscribeUser = async(req,res)=>{
    try {
        await User.findByIdAndUpdate(req.user.id,{
            $pull:{subscribedUsers: req.params.id}
        });
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers: -1}
        })
        res.status(200).json("Unsubscription successfully");
    } catch (error) {
        next(error);
    }
}

export const likeUserVideo = async(req,res)=>{
    try {
        
    } catch (error) {
        next(error);
    }
}

export const dislikeUserVideo = async(req,res)=>{
    try {
    
    } catch (error) {
        next(error);
    }
}