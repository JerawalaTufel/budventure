const mongoose = require('mongoose');

const AccessLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  deviceInfo: { type: String },
  status: { type: String, enum: ['success', 'failed'], required: true },
});

module.exports = mongoose.model('AccessLog', AccessLogSchema);