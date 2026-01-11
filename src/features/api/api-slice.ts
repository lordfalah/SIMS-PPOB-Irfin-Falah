import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "@/app/base-query";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Profile", "Balance", "Services", "Banner", "Transaction"],
  endpoints: () => ({}),
});
