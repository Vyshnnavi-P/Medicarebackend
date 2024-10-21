import User from "../models/user.js"; // Assuming User model
import nodemailer from 'nodemailer'; // Use 'import' for nodemailer
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config(); 
// Generate random reset code (for simplicity, use a number)
const generateResetCode = () => Math.floor(100000 + Math.random() * 900000);

export const getUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error fetching user count:', error);
    res.status(500).json({ message: 'Error fetching user count' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const { email } = req.params; // Use 'email' as the parameter
    const user = await User.findOne({ email }); // Query by email

    if (user) {
      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        status: user.status,
        // Include other fields as necessary
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Error fetching user details' });
  }
};

// Forgot password
export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Clear old reset code
      user.resetCode = undefined; 
      const resetCode = generateResetCode();
      user.resetCode = resetCode; // Store the new reset code in the user's record
      await user.save();
      

    // Send email with reset code
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Password Reset Code',
      text: `Your password reset code is: ${resetCode}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error sending email' });
      }
      res.status(200).json({ message: 'Reset code sent to your email' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
    const { resetCode, newPassword } = req.body;
    try {
      // Find the user with the given reset code
      const user = await User.findOne({ resetCode });
      if (!user) {
        return res.status(400).json({ error: 'Invalid reset code' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword; // Update password with the hashed version
      user.resetCode = undefined; // Clear the reset code
      user.resetCodeExpiry = undefined; // Clear the expiry (if applicable)
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error('Error resetting password:', error); // Log the error
      res.status(500).json({ error: 'Server error' });
    }
  };
  
