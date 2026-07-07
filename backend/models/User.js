import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/**
 * User Schema defining the user accounts for the application.
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
    /** @type {String} Encrypted password for authentication */
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"]
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

// Pre-save middleware to hash the password before saving
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare plain password with stored hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Override toJSON method to remove sensitive fields
UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model("User", UserSchema);

export default User;
