import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'

export default async function buildApp() {
  const app = fastify({
    logger: true,
  })

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  return app.withTypeProvider<ZodTypeProvider>()
}

export type FastifyZodInstance = Awaited<ReturnType<typeof buildApp>>
