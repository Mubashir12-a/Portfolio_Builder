/**
 * auth.js — Client-side JWT session utility
 *
 * Validates the stored JWT by decoding the payload locally (no network call).
 * Works with RS256 / HS256 — only reads the public `exp` claim.
 */

/**
 * Decodes a JWT and checks whether it is still valid (not expired).
 * @param {string} token - Raw JWT string
 * @returns {boolean}
 */
export function isTokenValid(token) {
  if (!token) return false;

  try {
    // JWT structure: header.payload.signature  (all base64url-encoded)
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    // Decode the payload (base64url → JSON)
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );

    const payload = JSON.parse(json);

    // `exp` is in seconds; Date.now() is in milliseconds
    if (!payload.exp) return false;
    return Date.now() < payload.exp * 1000;
  } catch {
    return false;
  }
}

/**
 * Reads the token from localStorage, validates its expiry, and returns it
 * if valid. Removes the stale token automatically if expired.
 * @returns {string|null} Valid token or null
 */
export function getValidToken() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  if (!isTokenValid(token)) {
    // Token exists but is expired — clean it up
    localStorage.removeItem("token");
    return null;
  }

  return token;
}
