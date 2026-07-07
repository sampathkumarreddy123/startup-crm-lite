import { BrowserRouter, useLocation } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import AppRoutes from "./routes";

/**
 * Main application content layout wrapper.
 * Dynamically hides sidebar and layout containers on login/register pages.
 */
function AppContent() {
  const { pathname } = useLocation();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Render registration and login pages full-screen without sidebar/wrappers
  if (isAuthPage) {
    return <AppRoutes />;
  }

  return (
    <div className="flex bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
        <AppRoutes />
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