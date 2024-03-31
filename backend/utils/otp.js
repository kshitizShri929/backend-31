const nodemailer = require('nodemailer');

// Function to send email with OTP
async function sendMail(formData) {
    // Initialize Nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Your email configuration
        service: "gmail",
        auth: {
            user: "pallaveechaubey11@gmail.com",
            pass: "cegsdkncovrouoal",
        }
    });

    // Email content
    const mailOptions = {
        from: "pallaveechaubey11@gmail.com",
        to: formData.emu,
        subject: "OTP for Registration Foxian Game" ,
        text: `Your OTP for registration is: ${formData.otp}`
    };

    // Send email
    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;



/*const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');

function generateOTP() {
    return otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
}

async function sendOTPByEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_password'
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = {
    generateOTP,
    sendOTPByEmail
};
 */