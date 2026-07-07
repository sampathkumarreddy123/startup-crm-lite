import { createContext, useContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

/**
 * Authentication Provider component that manages login state, user details, and tokens.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("crm-token"));
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on component mount
  useEffect(() => {
    const restoreSession = async () => {
      const storedToken = localStorage.getItem("crm-token");
      if (storedToken) {
        try {
          const res = await authService.getProfile();
          if (res && res.success) {
            setUser(res.data);
            setToken(storedToken);
          } else {
            // Token is invalid/expired
            authService.logout();
            setUser(null);
            setToken(null);
          }
        } catch (error) {
          console.error("Failed to restore session:", error);
          authService.logout();
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    restoreSession();
  }, []);

  /**
   * Log in a user.
   */
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res && res.success && res.data) {
        const { token: receivedToken, user: loggedUser } = res.data;
        localStorage.setItem("crm-token", receivedToken);
        setToken(receivedToken);
        setUser(loggedUser);
        return { success: true };
      }
      return { success: false, message: res.message || "Failed to log in" };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Invalid email or password";
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Register a new user.
   */
  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const res = await authService.register(name, email, password);
      if (res && res.success && res.data) {
        const { token: receivedToken, user: loggedUser } = res.data;
        localStorage.setItem("crm-token", receivedToken);
        setToken(receivedToken);
        setUser(loggedUser);
        return { success: true };
      }
      return { success: false, message: res.message || "Failed to register" };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Email already in use";
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out the current user.
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to use the AuthContext.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
