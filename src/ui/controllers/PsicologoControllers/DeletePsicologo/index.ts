import { deletePsicologoFactory } from '@domain/usecases/Psicologo/DeletePsicologo/DeletePsicologoFactory'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { PsicologoUuidParams } from '@ui/controllers/PsicologoControllers/PsicologoSchemas'
import type { FastifyReply, FastifyRequest } from 'fastify'

export default class DeletePsicologoController {
  async handle(
    req: FastifyRequest<{ Params: PsicologoUuidParams }>,
    res: FastifyReply,
  ) {
    try {
      const useCase = deletePsicologoFactory()

      await useCase.call(req.params.uuid)

      return res.status(204).send()
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
