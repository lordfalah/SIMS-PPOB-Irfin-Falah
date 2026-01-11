import { store } from "@/app/store";
import { logout } from "@/features/auth/auth-slice";
import { getToken } from "./storage";
import { isTokenExpired } from "./jwt";

export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const token = getToken();

  if (token && isTokenExpired(token)) {
    store.dispatch(logout());
    throw new Error("Token expired");
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}${input}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...init?.headers,
    },
  });

  if (res.status === 401) {
    store.dispatch(logout());
  }

  return res.json() as Promise<T>;
}
