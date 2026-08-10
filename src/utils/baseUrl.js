export function normalizeApiBaseUrl(value, fallback) {
  const rawValue = typeof value === "string" ? value.trim() : "";
  const rawFallback = typeof fallback === "string" ? fallback.trim() : "";
  const candidate = rawValue || rawFallback;

  if (!candidate) {
    return "";
  }

  if (/^https?:\/\//i.test(candidate)) {
    return candidate.replace(/\/$/, "");
  }

  if (/^(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(candidate)) {
    return `http://${candidate.replace(/\/$/, "")}`;
  }

  return `https://${candidate.replace(/\/$/, "")}`;
}