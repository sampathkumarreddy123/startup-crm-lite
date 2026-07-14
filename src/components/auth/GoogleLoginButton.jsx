/**
 * GoogleLoginButton — "Continue with Google" OAuth button.
 *
 * Clicking this button performs a full-page redirect to the backend Google OAuth
 * endpoint. The backend handles the OAuth dance and eventually redirects back to
 * /auth/callback on the frontend with a JWT set in an HTTP-only cookie.
 *
 * @param {object} props
 * @param {string} [props.className] - Additional Tailwind classes
 */
export default function GoogleLoginButton({ className = "" }) {
  const API_URL = import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5000"
      : "https://startup-crm-lite-production-071e.up.railway.app");

  /**
   * Redirect to the backend Google OAuth initiator endpoint.
   * This must be a full redirect (not an Axios request) so the browser
   * follows Google's OAuth consent page correctly.
   */
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/api/auth/google`;
  };

  return (
    <button
      id="google-login-btn"
      type="button"
      onClick={handleGoogleLogin}
      className={`
        group relative flex w-full items-center justify-center gap-3
        min-h-[48px] rounded-2xl border border-slate-300
        bg-white px-4 py-3 text-sm font-semibold text-slate-700
        shadow-sm transition-all duration-200
        hover:bg-slate-50 hover:border-slate-400 hover:shadow-md
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200
        dark:hover:bg-slate-600 dark:hover:border-slate-500
        active:scale-[0.98]
        ${className}
      `}
      aria-label="Continue with Google"
    >
      {/* Official Google "G" SVG logo */}
      <svg
        className="h-5 w-5 shrink-0"
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>

      <span>Continue with Google</span>

      {/* Subtle arrow indicator */}
      <svg
        className="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5 dark:text-slate-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
