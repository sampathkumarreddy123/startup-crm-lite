import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorResponse } from "../utils/apiResponse.js";

/**
 * Protect routes by verifying JWT tokens and attaching user context.
 */
export const protect = async (req, res, next) => {
  let token;

  // Extract JWT from Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // If no token is provided
  if (!token) {
    return errorResponse(res, "No token provided, access denied", 401);
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with this token
    const user = await User.findById(decoded.id).select("-password");

    // If the user doesn't exist anymore
    if (!user) {
      return errorResponse(res, "User belonging to this token no longer exists", 401);
    }

    // Attach user to req.user and proceed
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
