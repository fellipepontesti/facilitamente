import { psicologoRoutes } from '@ui/controllers/PsicologoControllers/PsicologoRoutes'
import type { FastifyZodInstance } from '@ui/server/app.js'

export async function appRoutes(app: FastifyZodInstance) {
  app.get('/health', async () => {
    return { status: 'facilitamente its ok!' }
  })

  await app.register(psicologoRoutes)
}
