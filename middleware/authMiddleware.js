// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware for verifying JWT token and role
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer <token>
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // Store user data in request
    next();
  });
};

// Middleware for role-based access control
const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'You do not have permission to access this resource' });
  }
  next();
};

module.exports = {
  verifyToken,
  checkRole,
};
