import { z } from 'zod';

// для данных
export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// для форм
export const signupFormSchema = userSchema.omit({ id: true }).extend({
  password: z.string(),
});
export const loginFormSchema = signupFormSchema.omit({ name: true });
