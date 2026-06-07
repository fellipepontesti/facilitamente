import { appRoutes } from '@ui/routes/routes'
import buildApp from '@ui/server/app'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

const app = await buildApp()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await app.register(appRoutes)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('🚀 Servidor rodando em http://localhost:3333')
})
