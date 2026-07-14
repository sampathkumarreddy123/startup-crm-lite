import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
import { UserCircle2 } from "lucide-react";
import Sidebar from "./components/common/Sidebar";
import AppRoutes from "./routes";

/**
 * Main application content layout wrapper.
 * Dynamically hides sidebar and layout containers on login/register pages.
 */
function AppContent() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Render registration and login pages full-screen without sidebar/wrappers
  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <main className="flex-1 overflow-x-hidden p-3 pb-24 sm:p-4 md:p-6 md:pb-6">
        <div className="mx-auto w-full max-w-7xl">
          <header className="mb-6 flex items-center justify-between rounded-2xl border border-gray-200 bg-white/90 px-4 py-3 shadow-sm backdrop-blur dark:border-gray-700 dark:bg-gray-800/90">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Workspace</p>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Startup CRM Lite</h2>
            </div>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
              aria-label="Open profile"
            >
              <UserCircle2 size={20} />
            </button>
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