import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy load pages for performance
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Leads = lazy(() => import("../pages/Leads"));
const Analytics = lazy(() => import("../pages/Analytics"));
const NotFound = lazy(() => import("../pages/NotFound"));

function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <Routes>
        {/* Dashboard Route */}
        <Route path="/" element={<Dashboard />} />

        {/* Leads Route */}
        <Route path="/leads" element={<Leads />} />

        {/* Analytics Route */}
        <Route path="/analytics" element={<Analytics />} />

        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;