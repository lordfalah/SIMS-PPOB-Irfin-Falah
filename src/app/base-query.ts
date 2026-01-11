import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { logout } from "@/features/auth/auth-slice";
import type { RootState } from "./store";
import { apiSlice } from "@/features/api/api-slice";

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const stateToken = (getState() as RootState).auth.token;
    const token = stateToken || localStorage.getItem("auth_token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithAuth: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const result = await baseQuery(args, api, extraOptions);

  if (
    result.error &&
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result.error.status === 401 || (result.error.data as any)?.status === 108)
  ) {
    api.dispatch(logout());
    api.dispatch(apiSlice.util.resetApiState());
  }

  return result;
};
