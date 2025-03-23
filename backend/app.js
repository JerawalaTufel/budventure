const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config()
const cors = require('cors')
const rateLimit = require('express-rate-limit');
const app = express();

connectDB();

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
    handler: (req, res) => {
      res.status(429).json({
        message: 'Too many login attempts from this IP. Please try again after 15 minutes.',
      });
    },
  });

app.use(express.json());
app.use(cors());
app.use(loginRateLimiter);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));