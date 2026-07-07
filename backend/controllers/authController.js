import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

/**
 * Generate a JWT for a user.
 * @param {string} userId - User document ID
 * @returns {string} Signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
};

/**
 * Register a new user.
 * Route: POST /api/auth/register (Public)
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return errorResponse(res, "Email already exists", 409, [
        { field: "email", message: "Email is already in use" }
      ]);
    }

    // Create new User document
    const user = await User.create({
      name,
      email,
      password
    });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user object without password
    const userResponse = user.toJSON();

    return successResponse(res, { token, user: userResponse }, "User registered successfully", 201);
  } catch (error) {
    next(error);
  }
};

/**
 * Login an existing user.
 * Route: POST /api/auth/login (Public)
 * NOTE: Production-level rate limiting should be registered on this route to prevent brute-force attacks.
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email and explicitly include password field
    const user = await User.findOne({ email }).select("+password");

    // Check credentials (never say which one is wrong specifically for security)
    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    // Check if account is active
    if (!user.isActive) {
      return errorResponse(res, "Account is deactivated", 403);
    }

    // Generate JWT token
    const token = generateToken(user._id);

    const userResponse = user.toJSON();

    return successResponse(res, { token, user: userResponse }, "Login successful");
  } catch (error) {
    next(error);
  }
};

/**
 * Get the current user profile.
 * Route: GET /api/auth/profile (Protected)
 */
export const getProfile = async (req, res, next) => {
  try {
    // req.user is already populated by protect middleware
    return successResponse(res, req.user, "User profile retrieved successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Update the current user profile.
 * Route: PUT /api/auth/profile (Protected)
 */
export const updateProfile = async (req, res, next) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!user) {
      return errorResponse(res, "User not found", 404);
    }

    // Allow updating name only
    if (name) {
      user.name = name;
    }

    // If changing password, validate old password first
    if (newPassword) {
      if (!oldPassword) {
        return errorResponse(res, "Old password is required to set a new password", 400);
      }
      
      const isMatch = await user.comparePassword(oldPassword);
      if (!isMatch) {
        return errorResponse(res, "Incorrect old password", 400, [
          { field: "oldPassword", message: "Old password does not match" }
        ]);
      }

      user.password = newPassword;
    }

    await user.save();

    const updatedUser = user.toJSON();
    return successResponse(res, updatedUser, "Profile updated successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Invalidate the token (client-side deletion).
 * Route: POST /api/auth/logout (Protected)
 */
export const logout = async (req, res, next) => {
  try {
    // Since JWT is stateless, the server cannot delete a token.
    // The client simply deletes the token from its storage.
    // Here we return success response.
    return successResponse(res, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};
