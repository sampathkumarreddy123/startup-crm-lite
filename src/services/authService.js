import api from "./api";

/**
 * Authentication API Service wrappers.
 */
const authService = {
  /**
   * Register a new user account.
   * @param {string} name 
   * @param {string} email 
   * @param {string} password 
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
   * Log in an existing user.
   * @param {string} email 
   * @param {string} password 
   */
  async login(email, password) {
    const payloadEmail = email?.trim().toLowerCase();
    const response = await api.post("/api/auth/login", { email: payloadEmail, password });
    return response.data;
  },

  /**
   * Log out on the client side by removing credentials.
   */
  logout() {
    localStorage.removeItem("crm-token");
    // Also trigger backend stateless endpoint if desired
    api.post("/api/auth/logout").catch(() => {});
  },

  /**
   * Get the logged-in user profile.
   */
  async getProfile() {
    const response = await api.get("/api/auth/profile");
    return response.data;
  },

  /**
   * Update the user profile (e.g., name or password).
   * @param {object} data - { name, oldPassword, newPassword }
   */
  async updateProfile(data) {
    const response = await api.put("/api/auth/profile", data);
    return response.data;
  }
};

export default authService;
