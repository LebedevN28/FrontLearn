import type { z } from 'zod';
import type { playerFormSchema } from './schema';

export type PlayerType = z.infer<typeof playerFormSchema>;

export type PlayerSliceType = {
  players: PlayerType[];
};
