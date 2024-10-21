import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const router = express.Router();

// Middleware to verify JWT token
const requireSignin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(403).json({ error: 'Access denied' });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Register user
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, gender, dob, status, password } = req.body;
    if (!firstName || !lastName || !email || !gender || !dob || !password || !status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      firstName,
      lastName,
      email,
      gender,
      dateOfBirth: dob,
      status,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login user and update last login time
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    user.joinedTime = new Date();
    await user.save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        joinedTime: user.joinedTime,
        status: user.status
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all users with last login time
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const secret = (req, res) => {
  res.json({ message: 'This is a secret endpoint, only accessible when signed in.' });
};