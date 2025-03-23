const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const authMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  const isPasswordValid = await bcrypt.compare(password, admin.password);

  if (!admin || !isPasswordValid) {
    admin.failedAttempts += 1;
    if (admin.failedAttempts >= 5) {
      admin.isLocked = true;
    }
    await admin.save();
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  if (admin.isLocked) {
    return res.status(403).json({ message: 'Account locked' });
  }

  req.admin = admin;
  next();
};

module.exports = authMiddleware;