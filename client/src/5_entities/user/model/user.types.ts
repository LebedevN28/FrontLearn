import type { z } from 'zod';
import type { loginFormSchema, signupFormSchema, userSchema } from './user.schema';

export type UserType = z.infer<typeof userSchema>;

export type UserSignupFormT = z.infer<typeof signupFormSchema>;
export type UserLoginFormT = z.infer<typeof loginFormSchema>;
