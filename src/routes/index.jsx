import { lazy, Suspense } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Lazy load pages for performance
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Leads = lazy(() => import("../pages/Leads"));
const Analytics = lazy(() => import("../pages/Analytics"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));

/**
 * Route protection wrapper component.
 * Redirects to /login if the user is unauthenticated.
 */
function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <div className="text-center font-semibold text-gray-700 dark:text-gray-300">
          Loading Startup CRM...
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

/**
 * App Routing structure defining Public and JWT Protected endpoints.
 */
function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-center font-medium text-gray-600 dark:text-gray-400">
          Loading page...
        </div>
      }
    >
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected App Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;