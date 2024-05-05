import { z } from "zod";

// Definição do esquema Zod para o usuário
export const userUpdateSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  createdAt: z.number(),
});

// Definição do tipo User
export type User = z.infer<typeof userUpdateSchema>;