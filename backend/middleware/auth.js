import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorResponse } from "../utils/apiResponse.js";

/**
 * Protect routes by verifying JWT tokens from:
 *  1. Authorization header (Bearer token) — used by email/password login flow
 *  2. HTTP-only cookie (crm_token) — used by Google OAuth login flow
 *
 * Attaches the resolved user to req.user and calls next().
 */
export const protect = async (req, res, next) => {
  let token;

  // 1. Check Authorization header (Bearer token — existing email/password flow)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. Fallback: check HTTP-only cookie (Google OAuth flow)
  if (!token && req.cookies?.crm_token) {
    token = req.cookies.crm_token;
  }

  // If no token found in either location
  if (!token) {
    return errorResponse(res, "No token provided, access denied", 401);
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with this token
    const user = await User.findById(decoded.id).select("-password");

    // If the user no longer exists
    if (!user) {
      return errorResponse(res, "User belonging to this token no longer exists", 401);
    }

    // Check if account is active
    if (!user.isActive) {
      return errorResponse(res, "Account is deactivated", 403);
    }

    // Attach user to req and proceed
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return errorResponse(res, "Token has expired, please login again", 401);
    }
    return errorResponse(res, "Token is invalid", 401);
  }
};

export default protect;
