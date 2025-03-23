const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  staticIP: { type: String },
  failedAttempts: { type: Number, default: 0 },
  isLocked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Admin', AdminSchema);