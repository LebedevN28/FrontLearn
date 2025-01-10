import { z } from 'zod';

// для данных
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  image: z.string().nullable(),
  level: z.number(),
  points: z.number(),
});

// для форм
export const signupFormSchema = userSchema.omit({ id: true, level: true, points: true, image: true }).extend({
  password: z.string(),
});
export const loginFormSchema = signupFormSchema.omit({ name: true });
