import { z } from "zod";

export const userUpdateSchema = z.object({
  id: z.string(),
  email: z.string().email().optional(),
  name: z.string().optional(),
  createdAt: z.number(),
});

export type UserZodSchema = z.infer<typeof userUpdateSchema>;

export interface UserPrisma {
  id: string | number;
  email: string;
  name: string | null;
  createdAt: string | Date;
}