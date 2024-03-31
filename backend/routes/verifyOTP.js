const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.passwordResetOTP !== otp || user.passwordResetExpiry < Date.now()) {
            return res.status(400).send('Invalid or expired OTP');
        }

        res.send('OTP verified successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
