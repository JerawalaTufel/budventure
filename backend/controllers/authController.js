const Admin = require('../models/Admin');
const AccessLog = require('../models/AccessLog');
const { generateOTP, sendOTP } = require('../services/otpService');
const { sendEmail } = require('../services/emailService');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const login = async (req, res) => {
  const { username, password, otp } = req.body;
  const ip = req.ip;
  const deviceInfo = req.headers['user-agent'];

  const admin = await Admin.findOne({ username });

  if (!admin) {
    await AccessLog.create({ ip, deviceInfo, status: 'failed' });
    await sendEmail(process.env.SUPER_ADMIN_EMAIL, 'Unauthorized Access Attempt', `IP: ${ip} attempted to access the admin panel.`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    await AccessLog.create({ ip, deviceInfo, status: 'failed' });
    await sendEmail(process.env.SUPER_ADMIN_EMAIL, 'Unauthorized Access Attempt', `IP: ${ip} attempted to access the admin panel.`);
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (admin.isLocked) {
    return res.status(403).json({ message: 'Account locked' });
  }

  if (!otp) {
    const otp = generateOTP();
    await sendOTP(admin.staticIP, otp);
    return res.status(200).json({ message: 'OTP sent', otpRequired: true });
  }

  if (otp !== admin.otp) {
    await AccessLog.create({ ip, deviceInfo, status: 'failed' });
    return res.status(401).json({ message: 'Invalid OTP' });
  }
  

  await AccessLog.create({ ip, deviceInfo, status: 'success' });
  res.status(200).json({ message: 'Login successful' });
};

const register = async (req, res) => {
  const { username, password, staticIP } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({ username, password: hashedPassword, staticIP });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { login, register };