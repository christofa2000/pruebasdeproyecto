
import { z } from 'zod'

export const projectStatusSchema = z.enum(['planning', 'in-progress', 'done'])

export const projectCreateSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres').max(60, 'Máximo 60'),
  description: z.string().max(300, 'Máximo 300').optional(),
  status: projectStatusSchema.default('planning'),
})

export const projectUpdateSchema = projectCreateSchema.partial()

export type ProjectCreateInput = z.infer<typeof projectCreateSchema>
export type ProjectUpdateInput = z.infer<typeof projectUpdateSchema>