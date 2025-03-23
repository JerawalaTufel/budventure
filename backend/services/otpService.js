const { sendEmail } = require('./emailService');

const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
};

const sendOTP = async (email, otp) => {
  const subject = 'Your OTP for Admin Panel Access';
  const text = `Your OTP is: ${otp}. It is valid for 1 hour.`;
  await sendEmail(email, subject, text);
};

module.exports = { generateOTP, sendOTP };