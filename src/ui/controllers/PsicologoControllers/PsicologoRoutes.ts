import type { FastifyZodInstance } from '@ui/server/app'
import CreatePsicologoController from './CreatePsicologo'
import { createPsicologoSchema } from './CreatePsicologo/createPsicologoSchema'

export async function psicologoRoutes(app: FastifyZodInstance) {
  app.post('/psicologo', { schema: createPsicologoSchema }, new CreatePsicologoController().handle)
}
