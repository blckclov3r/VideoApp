import express from 'express';
import { signin, signup } from '../controllers/auth.js';

const router = express.Router();


// create a user
router.post("/signup",signup)

// user signin
router.post("/signin", signin)

// google auth
router.post("/google")

export default router;