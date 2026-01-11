import type { Banner } from "@/types/banner.type";
import { apiSlice } from "./api-slice";
import type { TApiResponse } from "@/types/index.type";
import type { Service } from "@/types/service.type";

export const infoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query<Banner[], void>({
      query: () => "/banner",
      transformResponse: (response: TApiResponse<Banner[]>) => response.data,
      providesTags: ["Banner"],
    }),
    getServices: builder.query<Service[], void>({
      query: () => "/services",
      transformResponse: (response: TApiResponse<Service[]>) => response.data,
      providesTags: ["Services"],
    }),
  }),
});

export const { useGetBannersQuery, useGetServicesQuery } = infoApi;
