import { createPsicologoFactory } from '@domain/usecases/Psicologo/CreatePsicologo/CreatePsicologoFactory'
import { dataResponse } from '@ui/controllers/helpers/dataResponse'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { CreatePsicologoBody } from '@ui/controllers/PsicologoControllers/PsicologoSchemas'
import type { FastifyReply, FastifyRequest } from 'fastify'

export default class CreatePsicologoController {
  async handle(
    req: FastifyRequest<{ Body: CreatePsicologoBody }>,
    res: FastifyReply,
  ) {
    try {
      const useCase = createPsicologoFactory()
      const psicologo = await useCase.call(req.body)

      return dataResponse(res, 201, psicologo)
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
