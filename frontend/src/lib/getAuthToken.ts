// src/lib/getAuthToken.ts
export type AuthBits = {
  code?: string | null;
  access_token?: string | null;
  refresh_token?: string | null;
  error?: string | null;
  error_description?: string | null;
  type?: string | null; // e.g., "recovery", "signup"
};

export function getAuthToken(): AuthBits {
  const url = new URL(window.location.href);

  // Query params (PKCE code, errors, type)
  const qp = url.searchParams;
  const code = qp.get('code');
  const qErr = qp.get('error');
  const qErrDesc = qp.get('error_description');
  const type = qp.get('type');

  // Hash fragment (token-style flows)
  const hp = new URLSearchParams(url.hash.replace(/^#/, ''));
  const access_token = hp.get('access_token');
  const refresh_token = hp.get('refresh_token');
  const hErr = hp.get('error');
  const hErrDesc = hp.get('error_description');

  const error = qErr || hErr || null;
  const error_description = qErrDesc || hErrDesc || null;

  return { code, access_token, refresh_token, error, error_description, type };
}

export function stripAuthFromUrl() {
  const clean = window.location.origin + window.location.pathname;
  window.history.replaceState({}, '', clean);
}
