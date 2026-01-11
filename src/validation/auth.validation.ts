import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.email("Parameter email tidak sesuai format"),
    first_name: z.string().min(1, "First name wajib diisi"),
    last_name: z.string().min(1, "Last name wajib diisi"),
    password: z.string().min(8, "Password minimal 8 karakter"),
    confirm_password: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        path: ["confirm_password"],
        message: "password tidak sama",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const loginSchema = z.object({
  email: z.email("Parameter email tidak sesuai format"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

// TYPE
export type TLoginRequest = z.infer<typeof loginSchema>;
export type TRegisterRequest = z.infer<typeof registerSchema>;
