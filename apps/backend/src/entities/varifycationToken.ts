import { z } from 'zod';

export const varificateTokenRequestSchema = z.object({
  email: z.string().email(),
});

export type VarificateTokenRequestSchemaType = z.infer<typeof varificateTokenRequestSchema>;

export const varifyTokenRequestSchema = z.object({
  email: z.string().email(),
  token: z.string(),
});

export type VarifyTokenRequestSchemaType = z.infer<typeof varifyTokenRequestSchema>;
