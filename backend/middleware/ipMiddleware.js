const AccessLog = require('../models/AccessLog');

const isLocalIP = (ip) => {
  return ip.startsWith('192.168.') || ip.startsWith('10.');
};

const ipMiddleware = async (req, res, next) => {
  const ip = req.ip;
  
  const deviceInfo = req.headers['user-agent'];

  if (!isLocalIP(ip)) {
    await AccessLog.create({ ip, deviceInfo, status: 'failed' });
    return res.status(403).json({ message: 'Access Denied' });
  }

  next();
};

module.exports = ipMiddleware;