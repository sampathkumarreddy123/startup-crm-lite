import { errorResponse } from "../utils/apiResponse.js";

/**
 * Global Express Error Handler Middleware.
 * Catches all unhandled errors and format them for the client.
 */
export const errorHandler = (err, req, res, next) => {
  // Log the full error to console for debugging in dev
  if (process.env.NODE_ENV !== "production") {
    console.error(err);
  }

  let error = { ...err };
  error.message = err.message;
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";
  let errors = null;

  // 1. Mongoose ValidationError
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation failed";
    errors = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message
    }));
  }

  // 2. Mongoose CastError (e.g. invalid ObjectId)
  else if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found";
  }

  // 3. MongoDB duplicate key (code 11000)
  else if (err.code === 11000) {
    statusCode = 409;
    const duplicatedField = Object.keys(err.keyValue)[0];
    message = duplicatedField === "email" ? "Email already exists" : "Duplicate key error";
    errors = [{
      field: duplicatedField,
      message: `${duplicatedField.charAt(0).toUpperCase() + duplicatedField.slice(1)} is already in use`
    }];
  }

  // 4. JWT Verification Errors
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Token is invalid";
  }

  else if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token has expired, please login again";
  }

  // Build output response payload
  const responsePayload = {
    success: false,
    message,
    errors
  };

  // Add stack trace only in development environment
  if (process.env.NODE_ENV === "development") {
    responsePayload.stack = err.stack;
  }

  return res.status(statusCode).json(responsePayload);
};

export default errorHandler;
