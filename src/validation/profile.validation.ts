import z from "zod";

export const updateProfileImgSchema = z.object({
  profile_image: z.string().optional().nullable(),
});

export const updateProfileSchema = z.object({
  first_name: z.string().min(1, "First name wajib diisi"),
  last_name: z.string().min(1, "Last name wajib diisi"),
});

export type TUpdateProfileImgRequest = z.infer<typeof updateProfileImgSchema>;
export type TUpdateProfileRequest = z.infer<typeof updateProfileSchema>;
