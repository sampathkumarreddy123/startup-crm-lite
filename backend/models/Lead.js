import mongoose from "mongoose";

/**
 * Lead Schema defining the leads captured and tracked within the CRM.
 */
export const LeadSchema = new mongoose.Schema(
  {
    /** @type {String} The full name of the lead contact person */
    name: {
      type: String,
      required: [true, "Lead name is required"],
      trim: true,
      minlength: [2, "Lead name must be at least 2 characters"],
      maxlength: [100, "Lead name cannot exceed 100 characters"]
    },
    /** @type {String} The company the lead belongs to */
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true
    },
    /** @type {String} Lead's email address */
    email: {
      type: String,
      required: [true, "Lead email is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Email must be a valid email address"
      }
    },
    /** @type {String} Lead's contact phone number */
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    /** @type {String} The current status of the lead in the pipeline */
    status: {
      type: String,
      enum: {
        values: ["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"],
        message: "Status must be one of the specified pipeline steps"
      },
      default: "New"
    },
    /** @type {String} The marketing or lead generation source */
    source: {
      type: String,
      enum: {
        values: ["Website", "Referral", "LinkedIn", "Cold Call", "Email Campaign", "Other"],
        message: "Source must be one of the specified channel options"
      },
      default: "Website"
    },
    /** @type {String} Additional notes or description about the lead */
    notes: {
      type: String,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
      default: ""
    },
    /** @type {Number} The monetary value or deal size of the lead */
    value: {
      type: Number,
      min: [0, "Value cannot be negative"],
      default: 0
    },
    /** @type {mongoose.Schema.Types.ObjectId} Reference to the User who owns this lead record */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Lead owner reference is required"]
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual field: age (returns number of days since the lead was created)
LeadSchema.virtual("age").get(function () {
  if (!this.createdAt) return 0;
  const diffTime = Math.abs(new Date() - this.createdAt);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
});

// Indexes for query performance and owner isolation
LeadSchema.index({ owner: 1, status: 1 });
LeadSchema.index({ email: 1 });

const Lead = mongoose.model("Lead", LeadSchema);

export default Lead;
