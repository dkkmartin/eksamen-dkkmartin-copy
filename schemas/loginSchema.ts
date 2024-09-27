import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(2, { message: 'Ugyldigt brugernavn' }),
  password: z.string().min(2, { message: 'Ugyldigt password' }),
})
