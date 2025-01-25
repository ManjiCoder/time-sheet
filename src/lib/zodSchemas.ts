import { z } from 'zod';
export const task = z.object({
  isActive: z.string().transform((value) => value === 'on'),
  startTime: z
    .string({ required_error: 'Start Time is required' })
    .date('Invalid Date')
    .transform((value) => new Date(value).toISOString()),
  endTime: z
    .string({ required_error: 'End Time is required' })
    .date('Invalid Date')
    .transform((value) => new Date(value).toISOString()),
  category: z.string().default('Misc'),
  duration: z.string(),
});
