module.exports = router;

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateOTP, sendOTPByEmail } = require('../utils');

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const otp = generateOTP();
        user.passwordResetOTP = otp;
        user.passwordResetExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save();

        await sendOTPByEmail(email, otp);
        res.send('OTP sent successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
