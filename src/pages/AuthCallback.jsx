import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * AuthCallback page — handles the redirect from Google OAuth flow.
 *
 * After the user completes Google sign-in:
 *  1. Backend sets a JWT in an HTTP-only cookie.
 *  2. Backend redirects to this page: /auth/callback?status=success
 *  3. This page calls fetchCurrentUser() to load the user into AuthContext.
 *  4. On success, redirects to the Dashboard.
 *  5. On failure, redirects to /login with an error message.
 *
 * @returns {JSX.Element} Loading / error UI during the callback process
 */
export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { fetchCurrentUser, loginWithToken } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const status = searchParams.get("status");
      const errorParam = searchParams.get("error");

      // Handle explicit error from backend redirect
      if (errorParam || status !== "success") {
        const msg =
          errorParam === "google_auth_failed"
            ? "Google sign-in was cancelled or failed. Please try again."
            : errorParam === "server_error"
            ? "A server error occurred. Please try again later."
            : "Authentication failed. Please try again.";
        setError(msg);
        setTimeout(() => navigate("/login?error=auth_failed"), 3000);
        return;
      }

      try {
        // If the token is passed in the URL parameters, store it locally (bypasses cross-domain cookie blocks)
        const tokenParam = searchParams.get("token");
        if (tokenParam) {
          loginWithToken(tokenParam);
        }

        // Fetch the user from the backend using either the HTTP-only cookie or the localStorage token
        const userData = await fetchCurrentUser();

        if (userData) {
          // Small delay for a smooth UX
          setTimeout(() => navigate("/", { replace: true }), 500);
        } else {
          setError("Could not retrieve your account. Please try again.");
          setTimeout(() => navigate("/login?error=session_failed"), 3000);
        }
      } catch {
        setError("Authentication failed. Please try again.");
        setTimeout(() => navigate("/login?error=auth_failed"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, fetchCurrentUser, navigate, loginWithToken]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white/90 p-10 text-center shadow-xl backdrop-blur dark:border-slate-700 dark:bg-slate-800/90">
        {/* App logo */}
        <div className="mb-6 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md dark:bg-blue-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
          {error ? (
          <>
            {/* Error state */}
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 dark:bg-red-950/40">
              <svg className="h-7 w-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sign-in failed</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{error}</p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Redirecting you back…</p>
          </>
        ) : (
          <>
            {/* Loading / success state */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/30">
              {/* Animated spinner */}
              <svg
                className="h-7 w-7 animate-spin text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Signing you in…</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Setting up your workspace. This will just take a moment.
            </p>

            {/* Subtle progress dots */}
            <div className="mt-5 flex items-center justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full bg-blue-400 dark:bg-blue-500"
                  style={{
                    animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Startup CRM branding */}
      <p className="mt-6 text-xs text-slate-400 dark:text-slate-600">Startup CRM Lite · Secure sign-in</p>
    </div>
  );
}
