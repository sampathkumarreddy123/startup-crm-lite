import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Lazy load pages for performance
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Leads = lazy(() => import("../pages/Leads"));
const Analytics = lazy(() => import("../pages/Analytics"));
const Profile = lazy(() => import("../pages/Profile"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const AuthCallback = lazy(() => import("../pages/AuthCallback"));

/**
 * Loading fallback shown during lazy-loaded page transitions.
 */
function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="text-center">
        <svg
          className="mx-auto h-8 w-8 animate-spin text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
          Loading Startup CRM…
        </p>
      </div>
    </div>
  );
}

/**
 * Route protection wrapper component.
 * Redirects to /login if the user is unauthenticated.
 * Shows a loading state while session is being restored.
 */
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <PageLoader />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/**
 * App Routing structure defining Public and Protected endpoints.
 *
 * Public routes:
 *  /login          — Email/password + Google OAuth login page
 *  /register       — Email/password registration
 *  /auth/callback  — Google OAuth redirect handler
 *
 * Protected routes (require authentication):
 *  /               — Dashboard
 *  /leads          — Leads management
 *  /analytics      — Analytics & reports
 *  /profile        — User profile
 *
 *  *               — 404 Not Found
 */
function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ── Public Auth Routes ────────────────────────────────────── */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Google OAuth callback — must be public, no auth required */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* ── Protected App Routes ──────────────────────────────────── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* ── 404 Catch-all ────────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;