import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { fileURLToPath } from "url";

import { connectDB } from "./config/database.js";
import { errorHandler } from "./middleware/errorHandler.js";
import passportConfig from "./config/passport.js";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";
import { createHealthPayload, getHealthStatusCode } from "./utils/health.js";

// Load environment variables
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

console.log("Current Directory:", process.cwd());
console.log("Loaded GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Validate that all required environment variables are present.
 * Exits the process if any required keys are missing.
 */
const checkRequiredEnvVars = () => {
  const required = ["MONGODB_URI", "JWT_SECRET", "SESSION_SECRET"];
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
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" } // Allow Google avatar images
  })
);

// 2. Request Logging via Morgan
if (isProd) {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

// 3. CORS Configuration
// Must be before cookie-parser and session so credentials work correctly
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "https://your-app.vercel.app"
].filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, mobile apps)
    if (!origin) {
      return callback(null, true);
    }

    // In development, allow any origin (e.g. mobile devices on local network)
    if (!isProd) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true // Required for cookies to be sent cross-origin
};
app.use(cors(corsOptions));

// 4. Cookie Parser — must be before session and routes
app.use(cookieParser());

// 5. Express Session — required by Passport for the OAuth state parameter
// We use session: false in passport.authenticate, but express-session is still
// needed internally by passport-google-oauth20 to manage the OAuth state.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd,
      httpOnly: true,
      maxAge: 10 * 60 * 1000 // 10 minutes — only needed for OAuth flow
    }
  })
);

// 6. Initialize Passport (must be after session)
app.use(passportConfig.initialize());

// 7. Rate Limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: "Too many requests, please try again later."
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many auth attempts."
});

app.use("/api/", generalLimiter);
app.use("/api/auth/", authLimiter);

// 8. Body Parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// 9. Health Check Endpoints
let dbConnected = false;

app.get("/api/health", (req, res) => {
  res.status(getHealthStatusCode(dbConnected)).json(createHealthPayload(dbConnected));
});

app.get("/health", (req, res) => {
  res.status(getHealthStatusCode(dbConnected)).json(createHealthPayload(dbConnected));
});

// 10. Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

// 11. Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));

  app.get(/^(?!\/(api|assets)).*/, (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// 12. Global Error Handling Middleware (MUST be last)
app.use(errorHandler);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB();
    dbConnected = true;
  } catch (error) {
    console.error("MongoDB connection failed, continuing to serve health checks:", error.message);
  }

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || "development"} mode`);
    console.log(`Google OAuth: ${process.env.GOOGLE_CLIENT_ID ? "✓ Configured" : "✗ Not configured (set GOOGLE_CLIENT_ID)"}`);
  });

  // Graceful Shutdown Handlers
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