import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { normalizeEmail } from "../utils/email.js";

const isProd = process.env.NODE_ENV === "production";
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

/**
 * Generate a signed JWT for a given user ID.
 * @param {string} userId - MongoDB User document _id
 * @returns {string} Signed JWT token
 */
export const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
};

/**
 * Set JWT as an HTTP-only cookie on the response.
 * @param {object} res - Express response object
 * @param {string} token - Signed JWT string
 */
const setTokenCookie = (res, token) => {
  res.cookie("crm_token", token, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE OAUTH HANDLERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Handle the Google OAuth callback after Passport has authenticated the user.
 * Generates a JWT, sets it in an HTTP-only cookie, and redirects to the frontend.
 *
 * @route   GET /api/auth/google/callback (called after passport.authenticate succeeds)
 * @access  Public (Google redirects here)
 */
export const googleCallback = (req, res) => {
  const getClientUrl = () => {
    if (isProd) {
      return CLIENT_URL;
    }
    const host = req.get("host");
    if (host) {
      const hostname = host.split(":")[0];
      return `http://${hostname}:5173`;
    }
    return CLIENT_URL;
  };

  const frontendUrl = getClientUrl();

  try {
    // req.user is populated by passport.authenticate("google", { session: false })
    if (!req.user) {
      return res.redirect(`${frontendUrl}/login?error=google_auth_failed`);
    }

    const token = generateToken(req.user._id);

    // Set JWT in HTTP-only cookie
    setTokenCookie(res, token);

    // Redirect to the frontend auth callback page which will fetch /me and set context
    return res.redirect(`${frontendUrl}/auth/callback?status=success`);
  } catch (error) {
    console.error("[googleCallback] Error:", error);
    return res.redirect(`${frontendUrl}/login?error=server_error`);
  }
};

/**
 * Get the current authenticated user (used for cookie-based session restore).
 * Called by the frontend after Google OAuth callback to load the user into context.
 *
 * @route   GET /api/auth/me
 * @access  Protected (cookie or Bearer JWT)
 */
export const getCurrentUser = async (req, res, next) => {
  try {
    return successResponse(res, req.user, "Current user retrieved successfully");
  } catch (error) {
    next(error);
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL / PASSWORD HANDLERS (existing — preserved unchanged)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Register a new user with email/password.
 * @route   POST /api/auth/register (Public)
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = normalizeEmail(email || req.body?.emailAddress || req.body?.userEmail);

    if (!name || !normalizedEmail || !password) {
      return errorResponse(res, "Please provide name, email, and password", 400, [
        { field: "name", message: "Name is required" },
        { field: "email", message: "Email is required" },
        { field: "password", message: "Password is required" }
      ]);
    }

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return errorResponse(res, "Email already exists", 409, [
        { field: "email", message: "Email is already in use" }
      ]);
    }

    // Create new User document
    const user = await User.create({
      name,
      email: normalizedEmail,
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
 * Login an existing user with email/password.
 * @route   POST /api/auth/login (Public)
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    // Find user by email and explicitly include password field
    const user = await User.findOne({ email: normalizedEmail }).select("+password");

    // Check credentials (never reveal which field is wrong for security)
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
 * @route   GET /api/auth/profile (Protected)
 */
export const getProfile = async (req, res, next) => {
  try {
    return successResponse(res, req.user, "User profile retrieved successfully");
  } catch (error) {
    next(error);
  }
};

/**
 * Update the current user profile.
 * @route   PUT /api/auth/profile (Protected)
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
 * Logout the current user.
 * Clears the HTTP-only cookie and responds with success.
 * Client should also clear localStorage token for email/password flow.
 *
 * @route   POST /api/auth/logout (Protected)
 */
export const logout = async (req, res, next) => {
  try {
    // Clear the HTTP-only JWT cookie (Google OAuth flow)
    res.clearCookie("crm_token", {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax"
    });

    return successResponse(res, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};
