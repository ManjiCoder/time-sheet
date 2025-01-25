import { z } from 'zod';
export const task = z.object({
  isActive: z.boolean().default(false),
  startTime: z
    .string({ required_error: 'Start Time is required' })
    .date('Invalid Date'),
  endTime: z
    .string({ required_error: 'End Time is required' })
    .date('Invalid Date'),
  category: z.string().default('Misc'),
  duration: z.string().time({ precision: 3, message: 'Invalid Time' }),
});
