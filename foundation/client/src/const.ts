export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

/**
 * Generate login URL at runtime.
 * In foundation mode (NoAuth), this returns the current origin (no redirect).
 * Embedding repos with Manus OAuth will use the VITE_OAUTH_PORTAL_URL env var.
 */
export const getLoginUrl = () => {
  // Check for Manus OAuth config
  const oauthPortalUrl = import.meta.env.VITE_OAUTH_PORTAL_URL;
  const appId = import.meta.env.VITE_APP_ID;
  if (oauthPortalUrl && appId) {
    const redirectUri = `${window.location.origin}/api/oauth/callback`;
    const state = btoa(redirectUri);
    const url = new URL(`${oauthPortalUrl}/app-auth`);
    url.searchParams.set("appId", appId);
    url.searchParams.set("redirectUri", redirectUri);
    url.searchParams.set("state", state);
    url.searchParams.set("type", "signIn");
    return url.toString();
  }
  // Fallback: no auth redirect needed
  return window.location.origin;
};
