import { z } from 'zod';

const chatActionSchema = z.object({
  type: z.string(), // chat/setUsers
  payload: z.any(),
});

export default chatActionSchema;
