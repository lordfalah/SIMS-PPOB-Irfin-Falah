import type { TApiResponse } from "@/types/index.type";
import type { TRegisterRequest } from "@/validation/auth.validation";
import { apiSlice } from "./api-slice";
import type { TUpdateProfileRequest } from "@/validation/profile.validation";

export type TProfile = Omit<
  TRegisterRequest,
  "confirm_password" | "password"
> & {
  profile_image: string;
};

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<TProfile, void>({
      query: () => "/profile",
      transformResponse: (res: TApiResponse<TProfile>) => res.data,
      providesTags: ["Profile"],
    }),

    updateProfileImage: builder.mutation<
      { status: number; message: string },
      FormData
    >({
      query: (formData) => ({
        url: "/profile/image",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Profile"],
    }),

    updateProfile: builder.mutation<string, TUpdateProfileRequest>({
      query: (body) => ({
        url: "/profile/update",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
      transformResponse: (response: TApiResponse<TProfile>) => response.message,
    }),
  }),
});
export const {
  useGetProfileQuery,
  useUpdateProfileImageMutation,
  useUpdateProfileMutation,
} = profileApi;
