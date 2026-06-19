import { updatePsicologoFactory } from '@domain/usecases/Psicologo/UpdatePsicologo/UpdatePsicologoFactory'
import { dataResponse } from '@ui/controllers/helpers/dataResponse'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type {
  PsicologoIdParams,
  UpdatePsicologoBody,
} from '../PsicologoSchemas'

export default class UpdatePsicologoController {
  async handle(
    req: FastifyRequest<{
      Params: PsicologoIdParams
      Body: UpdatePsicologoBody
    }>,
    res: FastifyReply,
  ) {
    try {
      const useCase = updatePsicologoFactory()
      const psicologo = await useCase.call(req.params.id, req.body)

      return dataResponse(res, 200, psicologo)
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
