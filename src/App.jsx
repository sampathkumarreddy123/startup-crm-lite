import { BrowserRouter, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import UserMenu from "./components/auth/UserMenu";
import AppRoutes from "./routes";
import { useAuth } from "./context/AuthContext";

/**
 * Main application content layout wrapper.
 * Dynamically hides sidebar and layout containers on login/register/callback pages.
 */
function AppContent() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/auth/callback";

  // Render auth pages full-screen without sidebar/wrappers
  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-950">
      <Sidebar />

      <main className="flex-1 overflow-y-auto overflow-x-hidden p-3 pb-24 sm:p-4 md:p-6 md:pb-6">
        <div className="mx-auto w-full max-w-7xl">
          {/* ── App Header ─────────────────────────────────────────────── */}
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-800/90">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Workspace</p>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Startup CRM Lite
              </h2>
            </div>

            {/* User menu with Google avatar / initials dropdown */}
            {user && <UserMenu user={user} />}
          </header>

          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

/**
 * Root App component wrapper.
 * Registers routing context.
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;