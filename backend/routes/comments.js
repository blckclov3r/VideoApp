import express from "express";
import { addComment, deleteComment, getComments } from '../controllers/comment.js';
import { verifyToken } from '../verifyToken.js';

const router = express();


router.get("/:videoId",getComments)
router.post("/",verifyToken,addComment)
router.delete("/:id",verifyToken,deleteComment)


export default router;