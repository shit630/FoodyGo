require("dotenv").config();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject: "Reset Your Password",
    html: `
        <p>Your OTP for password reset is <b>${otp}</b>. It expries in 5 minutes.</p>
    `,
  });
};

module.exports = sendOtpMail;
