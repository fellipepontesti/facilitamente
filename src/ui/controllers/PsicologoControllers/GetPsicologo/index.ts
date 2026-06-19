import { getPsicologoFactory } from '@domain/usecases/Psicologo/GetPsicologo/GetPsicologoFactory'
import { dataResponse } from '@ui/controllers/helpers/dataResponse'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PsicologoIdParams } from '../PsicologoSchemas'

export default class GetPsicologoController {
  async handle(
    req: FastifyRequest<{ Params: PsicologoIdParams }>,
    res: FastifyReply,
  ) {
    try {
      const useCase = getPsicologoFactory()
      const psicologo = await useCase.call(req.params.id)

      return dataResponse(res, 200, psicologo)
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
