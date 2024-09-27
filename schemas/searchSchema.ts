import { z } from 'zod'

export const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(1, { message: 'Søgning kan ikke være tom' })
    .regex(/^[a-zA-Z0-9\s\-_]+$/, {
      message: 'Søgningen må kun indeholde bogstaver, tal, mellemrum, bindestreger og underscores',
    }),
})
