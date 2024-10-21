import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from 'dotenv';

dotenv.config();

export const requireSignin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select('-password');
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(403).json({ error: 'Access denied' });
    } else {
      next();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};