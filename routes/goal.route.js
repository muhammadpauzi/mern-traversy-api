import express from 'express';
import {
    createGoal,
    deleteGoal,
    findAllGoals,
    updateGoal,
} from '../controllers/goal.controller.js';
import { ensureAuthJWTToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

router
    .route('/')
    .get(ensureAuthJWTToken, findAllGoals)
    .post(ensureAuthJWTToken, createGoal);

router
    .route('/:id')
    .put(ensureAuthJWTToken, updateGoal)
    .delete(ensureAuthJWTToken, deleteGoal);

export default router;
