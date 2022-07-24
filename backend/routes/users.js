import express from 'express'
import { deleteUser,  dislikeUserVideo,  getUser,  likeUserVideo,  subscribeUser, unsubscribeUser, updateUser } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// update
router.put("/:id",verifyToken,updateUser)

// delete
router.delete("/:id",verifyToken,deleteUser);

// get user
router.get("/find/:id",getUser);

// subscribe user
router.put("/subscribe/:id",verifyToken,subscribeUser)

// unsubscribe user
router.put("/unsubscribe/:id",verifyToken,unsubscribeUser)

// like a video
router.put("/like/:videoId",verifyToken,likeUserVideo)

// dislike a video
router.put("/dislike/:videoId",verifyToken,dislikeUserVideo)



export default router;