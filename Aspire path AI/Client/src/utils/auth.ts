/**
 * Centralized Authentication & Token Extraction Utility
 * Handles extracting and syncing tokens across legacy and current storage keys.
 */

export interface StoredAuthData {
  user?: any;
  sessionToken?: string;
  token?: string;
}

export const getAuthToken = (): string | null => {
  // 1. Primary storage key used by AspirePath AI
  const stored = localStorage.getItem("AspirePath AIAuth");
  if (stored) {
    try {
      const parsed: StoredAuthData = JSON.parse(stored);
      if (parsed.sessionToken) return parsed.sessionToken;
      if (parsed.token) return parsed.token;
    } catch (e) {
      console.error("Error parsing AspirePath AIAuth:", e);
    }
  }

  // 2. Legacy / alternative keys
  const fallbackToken =
    localStorage.getItem("token") ||
    localStorage.getItem("authToken") ||
    localStorage.getItem("accessToken") ||
    sessionStorage.getItem("token");

  return fallbackToken || null;
};

export const syncAuthTokens = (sessionToken: string, user?: any) => {
  if (!sessionToken) return;
  // Sync to primary key
  localStorage.setItem(
    "AspirePath AIAuth",
    JSON.stringify({ sessionToken, user })
  );
  // Sync to legacy keys to guarantee all existing modules authenticate
  localStorage.setItem("token", sessionToken);
  localStorage.setItem("authToken", sessionToken);
};

export const clearAuthTokens = () => {
  localStorage.removeItem("AspirePath AIAuth");
  localStorage.removeItem("token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("accessToken");
  sessionStorage.removeItem("token");
};
