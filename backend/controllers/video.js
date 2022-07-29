import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
   const newVideo = new Video({ userId: req.user.id, ...req.body });
   try {
     const savedVideo = await newVideo.save();
     res.status(200).json(savedVideo);
   } catch (err) {
      console.log('addVideo',err);
     next(err);
   }
 };

export const updateVideo = async(req,res,next)=>{
    try {
       const video = await Video.findById(req.params.id);
       if(!video) return next(createError(404,'Video not found!'));
       if(req.user.id === video.userId){
        const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
            $set: req.body
        },{new: true})
        res.status(200).json(updatedVideo)
       }else{
        next(createError(403,'You can update only your video'));
       }
    } catch (error) {
       next(error);
    }   
}

export const deleteVideo = async(req,res,next)=>{
    try {
        const video = await Video.findById(req.params.id);
       if(!video) return next(createError(404,'Video not found!'));
       if(req.user.id === video.userId){
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("Video has been deleted")
       }else{
        next(createError(403,'You can delete only your video!'));
       }
    } catch (error) {
       next(error);
    }   
}

export const getVideo = async(req,res,next)=>{
    try {
       const video = await Video.findById(req.params.id);
       res.status(200).json(video);
    } catch (error) {
       next(error);
    }   
}


export const addView = async(req,res,next)=>{
    try {
       await Video.findByIdAndUpdate(req.params.id,{
        $inc: {views: 1}
       });
       res.status(200).json("The view has been increased");
    } catch (error) {
       next(error);
    }   
}


export const trendVideo = async(req,res,next)=>{
    try {
        // (-1) get the highest views, (1) is less view
       const videos = await Video.find().sort({views: -1})
       res.status(200).json(videos)
    } catch (error) {
       next(error);
    }   
}

export const randomVideo = async(req,res,next)=>{
    try {
       const videos = await Video.aggregate([{$sample: {size: 10}}])
       res.status(200).json(videos);
    } catch (error) {
       next(error);
    }   
}

export const subscribedVideo = async(req,res,next)=>{
    try {
       const user = await User.findById(req.user.id);
       const subscribedChannels = user.subscribedUsers;

    //    finding not one channel but all channels
       const list = await Promise.all(
        subscribedChannels.map(channelId => {
            return Video.find({userId: channelId})
        })
       )
      //  res.status(200).json(list); 
      res.status(200).json(list.flat().sort((a,b)=>b.createdAt - a.createdAt)); 
    } catch (error) {
       console.log('error => ',error);
       next(error);
    }   
}

export const getByTagVideo = async(req,res,next)=>{
   //?tags=js,sql,cpp
   const tags = req.query.tags.split(',') 
   // console.log(tags)
   try {
      const videos = await Video.find({tags: {$in: tags}}).limit(20);
      res.status(200).json(videos);
   } catch (error) {
      next(error);
   }   
}

export const searchVideo = async(req,res,next)=>{
   const query = req.query.q
   try {
      // regex search wherever inside in the query  while $options ignore uppercase and lowercase
      const videos = await Video.find({title: {$regex: query, $options: "i"}}).limit(20);
      res.status(200).json(videos);
   } catch (error) {
      next(error);
   }   
}

   