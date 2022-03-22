import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import asyncHandler from 'express-async-handler';

// @desc    Authenticate an user
// @route   POST /api/v1/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        const isPasswordSame = await bcrypt.compare(password, user.password);

        if (isPasswordSame) {
            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id),
                },
            });
        }
    }

    res.status(400);
    throw new Error('Invalid credentials');
});

// @desc    Register new user
// @route   POST /api/v1/auth/register
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if (user) {
        return res.status(201).json({
            message: 'User has been successfully registered',
            success: true,
            statusCode: 201,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            },
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Get user data
// @route   GET /api/v1/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
    const { _id, name, email } = req.user;
    return res.status(200).json({
        success: true,
        statusCode: 200,
        data: {
            _id,
            name,
            email,
        },
    });
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};
