import type { FastifyZodInstance } from '@ui/server/app.js'

export async function appRoutes(app: FastifyZodInstance) {
  app.get('/health', async () => {
    return { status: 'facilitamente its ok!' }
  })

  // // O Fastify gerencia o carregamento de cada um de forma assíncrona
  // await app.register(loginRoutes)
  // await app.register(userRoutes)
  // await app.register(empresaRoutes)
}
