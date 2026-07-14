import api from "./api";

/**
 * Authentication API Service wrappers.
 * Supports both email/password and Google OAuth flows.
 */
const authService = {
  /**
   * Register a new user account with email and password.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} API response data
   */
  async register(name, email, password) {
    const payloadEmail = email?.trim().toLowerCase();
    const response = await api.post("/api/auth/register", {
      name,
      email: payloadEmail,
      emailAddress: payloadEmail,
      userEmail: payloadEmail,
      password
    });
    return response.data;
  },

  /**
   * Log in an existing user with email and password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} API response data with token and user
   */
  async login(email, password) {
    const payloadEmail = email?.trim().toLowerCase();
    const response = await api.post("/api/auth/login", { email: payloadEmail, password });
    return response.data;
  },

  /**
   * Get the currently authenticated user.
   * Works for both Bearer token (email/password) and HTTP-only cookie (Google OAuth).
   * @returns {Promise<object>} API response data with user object
   */
  async getCurrentUser() {
    const response = await api.get("/api/auth/me");
    return response.data;
  },

  /**
   * Get the logged-in user profile (legacy endpoint — uses /profile).
   * @returns {Promise<object>} API response data with user object
   */
  async getProfile() {
    const response = await api.get("/api/auth/profile");
    return response.data;
  },

  /**
   * Update the user profile (e.g., name or password).
   * @param {object} data - { name, oldPassword, newPassword }
   * @returns {Promise<object>} API response data with updated user
   */
  async updateProfile(data) {
    const response = await api.put("/api/auth/profile", data);
    return response.data;
  },

  /**
   * Log out on both client and server.
   * Clears localStorage token and asks backend to clear the HTTP-only cookie.
   * @returns {Promise<void>}
   */
  async logout() {
    localStorage.removeItem("crm-token");
    // Clear HTTP-only cookie on the backend (catches both email and Google OAuth sessions)
    try {
      await api.post("/api/auth/logout");
    } catch {
      // Ignore errors — client-side logout is already done
    }
  }
};

export default authService;
