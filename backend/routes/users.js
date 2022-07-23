import express from 'express'
import { test } from '../controllers/user.js';

const router = express.Router();

router.get('/',(req,res)=>{
    res.json({
        msg: 'welcome'
    })
})

router.get("/test",test);


export default router;