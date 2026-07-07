import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Validate that all required environment variables are present.
 * Exits the process if any required keys are missing.
 */
const checkRequiredEnvVars = () => {
  const required = ["MONGODB_URI", "JWT_SECRET"];
  const missing = [];

  required.forEach((key) => {
    if (!process.env[key]) {
      missing.push(key);
    }
  });

  if (missing.length > 0) {
    console.error(`[FATAL] Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }
};

// Run environment validation
checkRequiredEnvVars();

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === "production";

// 1. Security Headers via Helmet
app.use(helmet());

// 2. Request Logging via Morgan
if (isProd) {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// 3. CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://your-app.vercel.app" // Placeholder from docs, can be customized
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

// 4. Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later."
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 auth requests per window
  message: "Too many auth attempts."
});

// Apply rate limits
app.use("/api/", generalLimiter);
app.use("/api/auth/", authLimiter);

// 5. Body Parsers (with size limits)
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 6. NoSQL Injection Protection
// app.use(mongoSanitize());

// app.use(
//   mongoSanitize({
//     replaceWith: "_"
//   })
// );

// 7. Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date()
  });
});

// 8. Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// 9. Serve the frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
  });
}

// 10. Global Error Handling Middleware (Registered LAST)
app.use(errorHandler);

// Connect to MongoDB and start the server
const startServer = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });

  // 10. Graceful Shutdown Handlers
  const shutdown = (signal) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    
    server.close(async () => {
      console.log("Http server closed.");
      
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed cleanly.");
        process.exit(0);
      } catch (err) {
        console.error("Error during database disconnection:", err);
        process.exit(1);
      }
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
};

startServer();