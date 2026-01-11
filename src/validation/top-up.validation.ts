import z from "zod";

export const topUpSchema = z.object({
  top_up_amount: z
    .number({
      error: "Nominal harus berupa angka",
    })
    .min(10000, "Minimal Rp10.000")
    .max(1000000, "Maksimal Rp1.000.000"),
});
export type TTopUpSchemaRequest = z.infer<typeof topUpSchema>;
