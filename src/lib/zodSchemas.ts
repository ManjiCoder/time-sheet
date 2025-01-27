import { z } from 'zod';
export const task = z.object({
  startTime: z.string().nonempty('Start Time is required').date('Invalid Date'),
  endTime: z.string().nonempty('End Time is required').date('Invalid Date'),
  duration: z.string().nonempty('Duration is required').default('00:00'),
  category: z.string().nonempty('Category is required').default('Misc'),
  isActive: z.boolean().default(false), // Ensure this field exists
});
