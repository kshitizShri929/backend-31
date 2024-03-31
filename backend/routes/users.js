// routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { generateOTP, sendOTPByEmail } = require('../utils/otp');

// API endpoint for user registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Generate OTP
        const otp = generateOTP();
        
        // Save OTP to database
        const user = new User({
            username,
            email,
            password,
            otp,
            otpExpiration: new Date(Date.now() + 600000) // OTP expiration time (10 minutes)
        });
        await user.save();

        // Send OTP via email
        await sendOTPByEmail(email, otp);

        res.status(200).json({ message: 'User registered successfully. Check your email for OTP.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

    // routes/users.js

// Pehle likhe hue code ke baad
// API endpoint for OTP verification
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        // Check if user exists and OTP is valid
        if (!user || user.otp !== otp || user.otpExpiration < Date.now()) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Clear OTP and OTP expiration
        user.otp = undefined;
        user.otpExpiration = undefined;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

});

module.exports = router;
