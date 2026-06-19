import { updatePsicologoFactory } from '@domain/usecases/Psicologo/UpdatePsicologo/UpdatePsicologoFactory'
import { dataResponse } from '@ui/controllers/helpers/dataResponse'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type {
  PsicologoUuidParams,
  UpdatePsicologoBody,
} from '@ui/controllers/PsicologoControllers/PsicologoSchemas'
import type { FastifyReply, FastifyRequest } from 'fastify'

export default class UpdatePsicologoController {
  async handle(
    req: FastifyRequest<{
      Params: PsicologoUuidParams
      Body: UpdatePsicologoBody
    }>,
    res: FastifyReply,
  ) {
    try {
      const useCase = updatePsicologoFactory()
      const psicologo = await useCase.call(req.params.uuid, req.body)

      return dataResponse(res, 200, psicologo)
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
