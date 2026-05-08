import jwt from 'jsonwebtoken';

// ==========================================
// AUTH MIDDLEWARE
// Protects routes by verifying JWT token
// Runs before the route handler
// ==========================================
const authenticateToken = (req, res, next) => {
  // Get token from request header
  // Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Please login.' });
  }

  try {
    // Verify token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user info to request so routes can use it
    req.user = decoded;
    
    // Move on to the actual route handler
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token. Please login again.' });
  }
};

export default authenticateToken;