const jwt = require('jsonwebtoken');
require('dotenv').config()
const generateToken = (adminId, staticIP) => {
  const payload = {
    adminId,
    staticIP,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  return token;
};

const verifyToken = (token) => {
  try { 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

module.exports = { generateToken, verifyToken };