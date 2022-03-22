import asyncHandler from 'express-async-handler';
import Goal from '../models/goal.model.js';
import User from '../models/user.model.js';

// @desc    Find all goals
// @route   GET /api/v1/goals
// @access  Private
export const findAllGoals = asyncHandler(async (req, res) => {
    // get id user from current user
    const { id: userId } = req.user;
    // get goals only by current user's id
    const goals = await Goal.find({ user: userId });

    return res.status(200).json({
        success: true,
        statusCode: 200,
        data: goals,
    });
});

// @desc    Create goal
// @route   POST /api/v1/goals
// @access  Private
export const createGoal = asyncHandler(async (req, res) => {
    const { id: userId } = req.user;

    if (!req.body.text?.trim()) {
        res.status(400);
        throw new Error('Please add a text value');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: userId,
    });

    return res.status(201).json({
        message: 'Goal has been successfully created',
        success: true,
        statusCode: 201,
        data: goal,
    });
});

// @desc    Update goal
// @route   POST /api/v1/goals/:id
// @access  Private
export const updateGoal = asyncHandler(async (req, res) => {
    const { id: goalId } = req.params;
    const { id: userId } = req.user;
    const { text } = req.body;

    const goal = await Goal.findById(goalId);

    if (!goal) {
        res.status(404);
        throw new Error("Goal doesn't exist");
    }

    if (!req.user) {
        res.status(401);
        throw new Error("User doesn't exist");
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
        goalId,
        { text },
        { new: true }
    );

    return res.status(200).json({
        message: 'Goal has been updated',
        success: true,
        statusCode: 200,
        data: updatedGoal,
    });
});

// @desc    Delete goal
// @route   POST /api/v1/goals/:id
// @access  Private
export const deleteGoal = asyncHandler(async (req, res) => {
    const { id: goalId } = req.params;
    const goal = await Goal.findById(goalId);

    if (!goal) {
        res.status(404);
        throw new Error("Goal doesn't exist");
    }

    if (!req.user) {
        res.status(401);
        throw new Error("User doesn't exist");
    }

    // make sure the logged in user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await goal.remove();

    return res.status(200).json({
        message: 'Goal has been successfully deleted',
        success: true,
        statusCode: 200,
    });
});
