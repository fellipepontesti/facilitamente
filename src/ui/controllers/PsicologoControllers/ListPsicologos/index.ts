import { listPsicologosFactory } from '@domain/usecases/Psicologo/ListPsicologos/ListPsicologosFactory'
import { dataResponse } from '@ui/controllers/helpers/dataResponse'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { FastifyReply, FastifyRequest } from 'fastify'

export default class ListPsicologosController {
  async handle(_req: FastifyRequest, res: FastifyReply) {
    try {
      const useCase = listPsicologosFactory()
      const psicologos = await useCase.call()

      return dataResponse(res, 200, psicologos)
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
