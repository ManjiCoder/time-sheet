import { z } from 'zod';
export const task = z.object({
  startTime: z.string().nonempty('required*').date('Invalid Date'),
  endTime: z.string().nonempty('required*').date('Invalid Date'),
  duration: z
    .string()
    .nonempty('required*')
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid Time')
    .default('00:00'),
  category: z.string().nonempty('required*').default('Misc'),
  isActive: z.boolean().default(false),
});
