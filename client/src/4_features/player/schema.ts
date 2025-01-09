import { z } from 'zod';

export const playerFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number().default(0),
  image: z.string().url().default('https://example.com/default-image.jpg'),
});
