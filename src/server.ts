import Fastify from 'fastify'
import { ZodTypeProvider, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { z } from 'zod'

const app = Fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.withTypeProvider<ZodTypeProvider>().post('/', {
  schema: {
    body: z.object({
      name: z.string(),
      age: z.number().min(18)
    }),
    response: {
      201: z.object({
        message: z.string(),
        id: z.string().uuid()
      })
    }
  }
}, async (request, reply) => {
  const { name, age } = request.body
  
  return reply.status(201).send({
    message: `Usuário ${name} criado com sucesso!`,
    id: crypto.randomUUID()
  })
})

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('🚀 Servidor rodando em http://localhost:3333')
})
