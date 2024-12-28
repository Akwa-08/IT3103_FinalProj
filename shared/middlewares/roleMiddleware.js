// /shared/middlewares/roleMiddleware.js
const roleMiddleware = (allowedRoles) => (req, res, next) => {
    const { role } = req.user;
  
    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions' });
    }
  
    next();
  };
  
  module.exports = roleMiddleware;
  