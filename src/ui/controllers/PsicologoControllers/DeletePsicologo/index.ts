import { deletePsicologoFactory } from '@domain/usecases/Psicologo/DeletePsicologo/DeletePsicologoFactory'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PsicologoIdParams } from '../PsicologoSchemas'

export default class DeletePsicologoController {
  async handle(
    req: FastifyRequest<{ Params: PsicologoIdParams }>,
    res: FastifyReply,
  ) {
    try {
      const useCase = deletePsicologoFactory()

      await useCase.call(req.params.id)

      return res.status(204).send()
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
