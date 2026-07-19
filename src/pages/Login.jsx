import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import DarkModeToggle from "../components/common/DarkModeToggle";

/**
 * Beautiful, responsive Login Page with dark mode compatibility,
 * micro-animations, and Google OAuth support.
 *
 * Supports:
 *  - Email + password login (existing flow)
 *  - "Continue with Google" OAuth 2.0 (new flow)
 */
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  const { login } = useAuth();
  const navigate = useNavigate();

  // Show error toast if redirected here from a failed OAuth attempt
  const oauthError = searchParams.get("error");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      toast.success("Welcome back!");
      navigate("/");
    } else {
      toast.error(res.message || "Invalid credentials");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-3 pt-20 pb-4 text-slate-900 transition-colors duration-200 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 dark:text-slate-100 sm:px-6 sm:pt-24 sm:pb-8 lg:px-8">
      <header className="absolute top-0 left-0 right-0 z-50 flex h-16 items-center justify-between px-4 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm dark:bg-blue-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight text-slate-800 dark:text-slate-200">
            Startup CRM Lite
          </span>
        </div>
        <DarkModeToggle variant="auth" />
      </header>
      <Toaster position="top-center" />

      {/* OAuth error banner */}
      {oauthError && (
        <div className="mx-auto mb-4 max-w-md rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
          <strong>Sign-in failed.</strong>{" "}
          {oauthError === "google_auth_failed"
            ? "Google authentication was cancelled. Please try again."
            : "An error occurred. Please try again."}
        </div>
      )}

      <div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 md:grid-cols-2">

          {/* ── Left panel (hero) ─────────────────────────────────────── */}
          <div className="hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-8 text-white md:flex md:flex-col md:justify-between">
            <div>
              {/* Logo mark */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <span className="text-lg font-bold tracking-tight">Startup CRM Lite</span>
              </div>

              <h2 className="text-3xl font-semibold leading-tight">
                Manage leads with<br />clarity and speed.
              </h2>
              <p className="mt-4 max-w-sm text-sm text-blue-50/90">
                Track opportunities, keep your pipeline moving, and stay on top of every customer conversation.
              </p>
            </div>

            {/* Feature highlights */}
            <div className="space-y-3">
              {[
                "Real-time lead tracking & analytics",
                "Google account — one-click sign in",
                "Beautiful dark mode interface"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 text-sm text-blue-100">
                  <svg className="h-4 w-4 text-cyan-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}

              <div className="mt-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm backdrop-blur-sm">
                <p className="font-medium">Trusted by modern teams</p>
                <p className="mt-1 text-blue-100">Clean reporting, fast updates, simple onboarding.</p>
              </div>
            </div>
          </div>

          {/* ── Right panel (form) ─────────────────────────────────────── */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-10">
            <div className="text-center">
              {/* Mobile logo */}
              <div className="mb-5 flex justify-center md:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 sm:text-base">
                Sign in to continue your workspace
              </p>
            </div>

            <div className="mt-8 space-y-5">
              {/* ── Email / Password form ──────────────────────────────── */}
              <form className="space-y-4" onSubmit={handleSubmit} autoComplete="off">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email-address"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="off"
                      spellCheck="false"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-500/30"
                      placeholder="Enter your work email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      spellCheck="false"
                      className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:focus:ring-blue-500/30"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <button
                  id="email-login-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Signing in…
                    </span>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              {/* ── Divider ───────────────────────────────────────────── */}
              <div className="relative flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
                  or continue with
                </span>
                <div className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* ── Google OAuth button ────────────────────────────────── */}
              <GoogleLoginButton />
            </div>


            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              New here?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
