import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

export const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("🔐 Received Token:", token);

  if (!token) {
    console.log("❌ No token provided");
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded JWT:", decoded);

    const user = await User.findById(decoded.id).select('-password');
    console.log("✅ User found:", user);

    if (!user) {
      console.log("❌ No user found with this token");
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err);
    return res.status(401).json({ message: 'Token failed' });
  }
};
