import express from 'express';
import {
    getMe,
    loginUser,
    registerUser,
} from '../controllers/auth.controller.js';
import { ensureAuthJWTToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', ensureAuthJWTToken, getMe);

export default router;
