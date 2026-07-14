import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User Schema defining the user accounts for the application.
 * Supports both email/password authentication and Google OAuth 2.0.
 */
export const UserSchema = new mongoose.Schema(
  {
    /** @type {String} The user's full name */
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"]
    },
    /** @type {String} Unique email address used for login */
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Email must be a valid email address"
      }
    },
    /**
     * @type {String} Encrypted password for email/password authentication.
     * Optional — Google OAuth users will not have a password.
     */
    password: {
      type: String,
      minlength: [6, "Password must be at least 6 characters"],
      select: false
    },
    /**
     * @type {String} Google OAuth unique user ID.
     * Set when the user signs in via Google.
     */
    googleId: {
      type: String,
      unique: true,
      sparse: true // Allows multiple docs with null googleId
    },
    /**
     * @type {String} Google profile photo URL.
     */
    avatar: {
      type: String,
      default: null
    },
    /**
     * @type {Boolean} Whether the email has been verified by Google.
     */
    verifiedEmail: {
      type: Boolean,
      default: false
    },
    /** @type {String} System role for permission scoping */
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "Role must be either 'admin' or 'user'"
      },
      default: "user"
    },
    /** @type {Boolean} State indicating if the user account is active */
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * Pre-save middleware to hash the password before saving.
 * Only runs if the password field was modified and is present.
 */
UserSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * Instance method to compare plain password with stored hashed password.
 * @param {string} candidatePassword - Plain text password to compare
 * @returns {Promise<boolean>} True if passwords match
 */
UserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Override toJSON method to remove sensitive fields from serialized output.
 * @returns {object} User object without password
 */
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", UserSchema);

export default User;
