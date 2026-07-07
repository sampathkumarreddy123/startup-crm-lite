import express from "express";
import { body } from "express-validator";
import {
  getLeads,
  createLead,
  getLeadById,
  updateLead,
  updateLeadStatus,
  deleteLead,
  getLeadStats,
  getMonthlyStats,
  getLeadsSearch
} from "../controllers/leadController.js";
import protect from "../middleware/auth.js";
import validate from "../middleware/validate.js";

const router = express.Router();

// Protect all routes in this router
router.use(protect);

// Lead validation rules
const leadValidations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Lead name is required")
    .isLength({ min: 2 })
    .withMessage("Lead name must be at least 2 characters"),
  body("company")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Lead email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("status")
    .optional()
    .isIn(["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"])
    .withMessage("Invalid lead status"),
  body("source")
    .optional()
    .isIn(["Website", "Referral", "LinkedIn", "Cold Call", "Email Campaign", "Other"])
    .withMessage("Invalid lead source"),
  body("phone")
    .optional()
    .trim(),
  body("notes")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Notes cannot exceed 1000 characters")
];

const leadStatusValidations = [
  body("status")
    .notEmpty()
    .withMessage("Status is required")
    .isIn(["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"])
    .withMessage("Invalid lead status")
];

// Special/Static routes (declared BEFORE dynamic /:id parameter)
router.get("/stats/summary", getLeadStats);
router.get("/stats/monthly", getMonthlyStats);
router.get("/search", getLeadsSearch);

// Standard CRUD endpoints
router.get("/", getLeads);
router.post("/", validate(leadValidations), createLead);
router.get("/:id", getLeadById);
router.put("/:id", validate(leadValidations), updateLead);
router.patch("/:id/status", validate(leadStatusValidations), updateLeadStatus);
router.delete("/:id", deleteLead);

export default router;
