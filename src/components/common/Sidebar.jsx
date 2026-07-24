import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  UserCircle2,
  LogOut
} from "lucide-react";

import DarkModeToggle from "./DarkModeToggle";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />
    },
    {
      name: "Leads",
      path: "/leads",
      icon: <Users size={20} />
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserCircle2 size={20} />
    }
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className="
          hidden md:flex
          flex-col
          md:w-20
          lg:w-64
          min-h-screen
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          p-4
          transition-colors duration-200
        "
      >
        {/* Logo */}
        <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm dark:bg-blue-500">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <span className="hidden lg:block text-xl font-bold tracking-tight text-blue-600 dark:text-blue-500">
            Startup CRM
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3 flex-1">
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `
                flex items-center
                justify-center lg:justify-start
                gap-3
                min-h-[44px]
                px-4
                rounded-xl
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }
                `
              }
            >
              {link.icon}

              <span className="hidden lg:block">
                {link.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-auto flex flex-col gap-2">
          <DarkModeToggle />
          <button
            onClick={handleLogout}
            className="
              flex items-center
              justify-center lg:justify-start
              gap-3
              min-h-[44px]
              px-4
              rounded-xl
              text-red-500
              hover:bg-red-50 dark:hover:bg-red-950/20
              transition-colors duration-200
            "
            title="Logout"
          >
            <LogOut size={20} />
            <span className="hidden lg:block">Logout</span>
          </button>
        </div>
      </aside>


      {/* Mobile Bottom Nav */}
      <nav
        className="
          fixed bottom-0 left-0 right-0
          md:hidden
          flex justify-around items-center
          bg-white dark:bg-gray-800
          border-t border-gray-200 dark:border-gray-700
          p-3 z-50
        "
      >
        {links.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) =>
              `
              p-3 rounded-xl
              min-w-[44px]
              min-h-[44px]
              flex items-center justify-center
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 dark:text-gray-300"
              }
              `
            }
          >
            {link.icon}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="p-3 rounded-xl min-w-[44px] min-h-[44px] flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </nav>

    </>
  );
}

export default Sidebar;