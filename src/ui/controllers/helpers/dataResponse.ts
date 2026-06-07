import type { FastifyReply } from 'fastify'

export function dataResponse(
  response: FastifyReply,
  statusCode: number,
  data: unknown,
): FastifyReply {
  return response.status(statusCode).send(data)
}
