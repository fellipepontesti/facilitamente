import { dataResponse } from '@ui/controllers/helpers/dataResponse'
import { errorResponse } from '@ui/controllers/helpers/errorResponse'
import type { FastifyReply, FastifyRequest } from 'fastify'

export default class CreatePsicologoController {
  async handle(_req: FastifyRequest, res: FastifyReply): Promise<FastifyReply> {
    try {
      return dataResponse(res, 200, undefined)
    } catch (error) {
      return errorResponse(res, error)
    }
  }
}
