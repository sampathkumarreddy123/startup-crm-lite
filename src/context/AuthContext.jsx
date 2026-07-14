import { createContext, useContext, useState, useEffect, useCallback } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

/**
 * Authentication Provider component that manages login state, user details, and tokens.
 * Supports both:
 *  - Email/password auth (JWT stored in localStorage, sent as Authorization: Bearer)
 *  - Google OAuth 2.0 (JWT stored in HTTP-only cookie, auto-sent by browser)
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("crm-token"));
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Fetch the current user from the backend.
   * Tries /api/auth/me which works for both cookie (Google) and Bearer (email/password).
   * @returns {Promise<object|null>} User object or null
   */
  const fetchCurrentUser = useCallback(async () => {
    try {
      const res = await authService.getCurrentUser();
      if (res && res.success && res.data) {
        setUser(res.data);
        return res.data;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  /**
   * Restore session on app mount.
   * Tries both localStorage token (email/password) and HTTP-only cookie (Google OAuth).
   */
  useEffect(() => {
    const restoreSession = async () => {
      setIsLoading(true);
      try {
        // This single call handles both flows:
        // - If localStorage token exists, api.js attaches it as Bearer → backend reads it
        // - If HTTP-only cookie exists, browser auto-sends it → backend reads from cookie
        const userData = await fetchCurrentUser();
        if (!userData) {
          // Clear any stale local state
          localStorage.removeItem("crm-token");
          setToken(null);
          setUser(null);
        }
      } catch {
        localStorage.removeItem("crm-token");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [fetchCurrentUser]);

  /**
   * Log in a user with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, message?: string}>}
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
   * Register a new user with name, email, and password.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, message?: string, errors?: Array}>}
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
      const errorMsg = error.response?.data?.message || "Unable to create account";
      const fieldErrors = error.response?.data?.errors;
      return {
        success: false,
        message: errorMsg,
        errors: fieldErrors || []
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update the current user's profile details.
   * @param {object} profileData - { name, oldPassword, newPassword }
   * @returns {Promise<{success: boolean, data?: object, message?: string}>}
   */
  const updateProfile = async (profileData) => {
    try {
      const res = await authService.updateProfile(profileData);
      if (res && res.success && res.data) {
        setUser(res.data);
        return { success: true, data: res.data };
      }
      return { success: false, message: res?.message || "Unable to update profile" };
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Unable to update profile";
      return { success: false, message: errorMsg };
    }
  };

  /**
   * Log out the current user.
   * Clears localStorage, HTTP-only cookie (via backend), and resets state.
   */
  const logout = async () => {
    await authService.logout(); // Clears both localStorage and backend cookie
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user, // Derived from user object (works for both flows)
        login,
        register,
        logout,
        updateProfile,
        fetchCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Custom hook to consume the AuthContext.
 * @returns {object} Auth context value
 * @throws {Error} If used outside of AuthProvider
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
