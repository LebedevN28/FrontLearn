// undefined | null | { id, name, email }
// { status: 'fetching' } | { status: 'guest' } | { status: 'logged', data: { id, name, email } }

import { z } from 'zod';
import { userSchema } from '../../../5_entities/user/model/user.schema';

export const authResponseSchema = z.object({
  accessToken: z.string(),
  user: userSchema,
});

