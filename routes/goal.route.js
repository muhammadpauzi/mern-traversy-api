import express from 'express';
import {
    createGoal,
    deleteGoal,
    findAllGoals,
    updateGoal,
} from '../controllers/goal.controller.js';

const router = express.Router();

router.route('/').get(findAllGoals).post(createGoal);
router.route('/:id').put(updateGoal).delete(deleteGoal);

export default router;
