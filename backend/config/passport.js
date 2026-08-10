import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

/**
 * Configure Passport.js with the Google OAuth 2.0 strategy.
 *
 * Flow:
 *  1. User clicks "Continue with Google" on the frontend.
 *  2. Browser is redirected to Google's consent screen.
 *  3. After consent, Google redirects to /api/auth/google/callback with a code.
 *  4. Passport exchanges the code for an access token and fetches the Google profile.
 *  5. This verify callback finds or creates a User document, then calls done(null, user).
 *  6. The route handler then issues a JWT and sets an HTTP-only cookie.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.CALLBACK_URL ||
        (process.env.NODE_ENV === "production"
          ? (process.env.BACKEND_URL
              ? `${process.env.BACKEND_URL}/api/auth/google/callback`
              : "https://startup-crm-lite-production-071e.up.railway.app/api/auth/google/callback")
          : "/api/auth/google/callback"),
      scope: ["profile", "email"]
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value?.toLowerCase();
        const name = profile.displayName || profile.name?.givenName || "Google User";
        const avatar = profile.photos?.[0]?.value || null;
        const verifiedEmail = profile.emails?.[0]?.verified === true;

        if (!email) {
          return done(new Error("No email returned from Google"), null);
        }

        // 1. Try to find existing user by googleId
        let user = await User.findOne({ googleId });

        if (user) {
          // Update avatar/name in case they changed on Google
          user.avatar = avatar;
          user.name = name;
          user.verifiedEmail = verifiedEmail;
          await user.save();
          return done(null, user);
        }

        // 2. Try to find existing user by email (they registered with email/password before)
        user = await User.findOne({ email });

        if (user) {
          // Link Google account to the existing email/password account
          user.googleId = googleId;
          user.avatar = avatar;
          user.verifiedEmail = verifiedEmail;
          await user.save();
          return done(null, user);
        }

        // 3. No existing user — create a new Google-only account
        user = await User.create({
          googleId,
          name,
          email,
          avatar,
          verifiedEmail,
          isActive: true
        });

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

/**
 * Serialize user ID into the session.
 * @param {object} user - Mongoose User document
 * @param {Function} done
 */
passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

/**
 * Deserialize user from session by ID.
 * @param {string} id - User MongoDB _id as string
 * @param {Function} done
 */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select("-password");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
