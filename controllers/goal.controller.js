import asyncHandler from 'express-async-handler';
import Goal from '../models/goal.model.js';

// @desc    Find all goals
// @route   GET /api/v1/goals
// @access  Private
export const findAllGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find();
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
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text value');
    }
    const goal = await Goal.create({
        text: req.body.text,
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
    const { text } = req.body;
    const goal = await Goal.findById(goalId);

    if (!goal) {
        res.status(404);
        throw new Error("Goal doesn't exist");
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

    await goal.remove();

    return res.status(200).json({
        message: 'Goal has been successfully deleted',
        success: true,
        statusCode: 200,
    });
});
