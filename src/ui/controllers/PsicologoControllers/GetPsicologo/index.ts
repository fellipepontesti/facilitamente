import { getPsicologoFactory } from '@domain/usecases/Psicologo/GetPsicologo/GetPsicologoFactory'
import { dataResponse } from '@ui/controllers/helpers/dataResponse'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { PsicologoUuidParams } from '@ui/controllers/PsicologoControllers/PsicologoSchemas'
import type { FastifyReply, FastifyRequest } from 'fastify'

export default class GetPsicologoController {
  async handle(
    req: FastifyRequest<{ Params: PsicologoUuidParams }>,
    res: FastifyReply,
  ) {
    try {
      const useCase = getPsicologoFactory()
      const psicologo = await useCase.call(req.params.uuid)

      return dataResponse(res, 200, psicologo)
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
