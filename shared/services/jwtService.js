// /shared/services/jwtService.js
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

// Generate a JWT token
const generateJWT = (user) => {
  const payload = { id: user.id, role: user.role };
  return jwt.sign(payload, SECRET, { expiresIn: '2h' });
};

// Verify JWT token
const verifyJWT = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generateJWT, verifyJWT };
