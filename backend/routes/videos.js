import express from 'express';
import { addVideo, addView, deleteVideo, getVideo, randomVideo,  searchVideo,  subscribedVideo,  getByTagVideo,  trendVideo, updateVideo } from '../controllers/video.js';
import { verifyToken } from '../verifyToken.js';

const router = express.Router();

router.post('/',verifyToken, addVideo)

router.put('/',verifyToken, updateVideo)

router.delete('/',verifyToken, deleteVideo)

router.get('/find/:id', getVideo)
router.put('/view/:id', addView)

router.get('/trend', trendVideo)
router.get('/random', randomVideo)
router.get('/sub', verifyToken,subscribedVideo)

router.get('/tags', getByTagVideo)
router.get('/search', searchVideo)

export default router;