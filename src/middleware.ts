import { redirect } from "react-router";
import { isTokenExpired } from "./lib/jwt";
import { clearToken } from "./lib/storage";

const TOKEN_KEY = "auth_token";
// Middleware untuk halaman yang WAJIB Login (Dashboard)
// eslint-disable-next-line no-empty-pattern
export async function authMiddleware({}, next: () => Promise<unknown>) {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw redirect("/auth/login");
  }

  if (isTokenExpired(token)) {
    clearToken();
    throw redirect("/auth/login");
  }

  return await next();
}

// Middleware untuk halaman GUEST (Login/Register)
export async function guestMiddleware(
  // eslint-disable-next-line no-empty-pattern
  {},
  next: () => Promise<unknown>,
) {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    throw redirect("/dashboard");
  }

  return await next();
}
