import { z } from "zod";

import { zPhone } from "../global";

export const signInSchema = z.object({
  phoneNumber: zPhone,
  countryCode: z.string().length(2),
});

export const verifySchema = z.object({
  code: z.string().length(6).regex(/^\d+$/),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export type VerifySchema = z.infer<typeof verifySchema>;
