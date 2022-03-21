import express from 'express';
import {
    createGoal,
    deleteGoal,
    findAllGoals,
    updateGoal,
} from '../controllers/goal.controller.js';

const router = express.Router();

router.get('/', findAllGoals).post(createGoal);
router.get('/:goalId', updateGoal).post(deleteGoal);

export default router;
