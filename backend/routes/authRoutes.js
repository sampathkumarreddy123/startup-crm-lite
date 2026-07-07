import express from "express";
import { body } from "express-validator";
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout
} from "../controllers/authController.js";
import protect from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Validation chains for register
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

// Validation chains for login
const loginValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
];

// Validation chains for profile update
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

// Route definitions
router.post("/register", validate(registerValidations), register);
router.post("/login", validate(loginValidations), login);

// Apply auth middleware to protect subsequent endpoints
router.get("/profile", protect, getProfile);
router.put("/profile", protect, validate(updateProfileValidations), updateProfile);
router.post("/logout", protect, logout);

export default router;
