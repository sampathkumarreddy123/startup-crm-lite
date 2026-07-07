export const normalizeEmail = (email) => {
  return typeof email === "string" ? email.trim().toLowerCase() : "";
};
