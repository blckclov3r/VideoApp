import { createError } from "../error.js"
import User from "../models/User.js";



export const updateUser = async(req,res,next)=>{
    
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


export const deleteUser = async(req,res)=>{
   
}

export const getUser = async(req,res)=>{
   
}

export const subscribeUser = async(req,res)=>{
   
}

export const unsubscribeUser = async(req,res)=>{
   
}

export const likeUser = async(req,res)=>{
   
}

export const dislikeUser = async(req,res)=>{
   
}