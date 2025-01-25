import { z } from 'zod';
export const task = z.object({
  isActive: z.boolean().default(false),
  startTime: z.string().date('Invalid Date'),
  endTime: z.string().date('Invalid Date'),
  category: z.string().default('Misc'),
  duration: z.string(),
});
