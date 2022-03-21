import express from 'express';
import {
    getMe,
    loginUser,
    registerUser,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', getMe);

export default router;
