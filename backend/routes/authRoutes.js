import express from "express";
import passport from "passport";
import { body } from "express-validator";
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
  googleCallback,
  getCurrentUser
} from "../controllers/authController.js";
import protect from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// GOOGLE OAUTH 2.0 ROUTES
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @route   GET /api/auth/google
 * @desc    Initiate Google OAuth flow — redirects to Google consent screen
 * @access  Public
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false
  })
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback — exchanges code, creates/finds user, sets JWT cookie
 * @access  Public (called by Google only)
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`
  }),
  googleCallback
);

/**
 * @route   GET /api/auth/me
 * @desc    Get current user from HTTP-only cookie JWT (Google OAuth session restore)
 * @access  Protected (cookie-based)
 */
router.get("/me", protect, getCurrentUser);

// ─────────────────────────────────────────────────────────────────────────────
// EMAIL / PASSWORD AUTH ROUTES (existing — preserved unchanged)
// ─────────────────────────────────────────────────────────────────────────────

/** Validation chains for register */
const registerValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

/** Validation chains for login */
const loginValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password").notEmpty().withMessage("Password is required")
];

/** Validation chains for profile update */
const updateProfileValidations = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters"),
  body("newPassword")
    .optional()
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters"),
  body("oldPassword")
    .optional()
    .custom((value, { req }) => {
      if (req.body.newPassword && !value) {
        throw new Error("Old password is required to change password");
      }
      return true;
    })
];

/**
 * @route   POST /api/auth/register
 * @access  Public
 */
router.post("/register", validate(registerValidations), register);

/**
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post("/login", validate(loginValidations), login);

/**
 * @route   GET /api/auth/profile
 * @access  Protected
 */
router.get("/profile", protect, getProfile);

/**
 * @route   PUT /api/auth/profile
 * @access  Protected
 */
router.put("/profile", protect, validate(updateProfileValidations), updateProfile);

/**
 * @route   POST /api/auth/logout
 * @desc    Clears HTTP-only cookie + session. Client should also clear localStorage.
 * @access  Protected
 */
router.post("/logout", protect, logout);

export default router;
