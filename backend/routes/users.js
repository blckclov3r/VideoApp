import express from 'express'
import { deleteUser, dislikeUser, getUser, likeUser, subscribeUser, unsubscribeUser, updateUser } from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

// update
router.put("/:id",verifyToken,updateUser)

// delete
router.delete("/:id",deleteUser);

// get user
router.get("/find/:id",getUser);

// subscribe user
router.put("/subscribe/:id",subscribeUser)

// unsubscribe user
router.put("/unsubscribe/:id",unsubscribeUser)

// like a video
router.put("/like/:videoId",likeUser)

// dislike a video
router.put("/dislike/:videoId",dislikeUser)



export default router;