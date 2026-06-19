import type { FastifyReply } from 'fastify'

interface HttpResponse {
  statusCode: number
  success: boolean
  error: {
    type: string
    message: string
    errors?: string[] | Record<string, string[]>
  }
}

interface RequestError {
  name?: string
  message?: string
  errors?: string[]
  validation?: Array<{
    instancePath: string
    message: string
  }>
}

export function errorResponse(res: FastifyReply, error: unknown): FastifyReply {
  const status = getStatus(error)
  let responseBody: HttpResponse

  if (status === 500) {
    if (process.env.NODE_ENV !== 'test') {
      console.error('Internal Server Error:', error)
    }

    responseBody = {
      statusCode: 500,
      success: false,
      error: {
        type: 'InternalServerError',
        message: 'Ocorreu um erro interno inesperado em nosso servidor.',
      },
    }
  } else {
    responseBody = mountJson(status, error)
  }

  return res.status(responseBody.statusCode).send(responseBody)
}

function normalizeError(error: unknown): RequestError {
  if (error instanceof Error) {
    return error as RequestError
  }

  if (typeof error === 'object' && error !== null) {
    return error as RequestError
  }

  return {
    name: 'BadRequestError',
    message: 'Erro inesperado',
  }
}

function getStatus(error: unknown): number {
  const normalizedError = normalizeError(error)

  if (normalizedError.validation) {
    return 400
  }

  switch (normalizedError.name) {
    case 'UnauthorizedError':
      return 401

    case 'ForbiddenError':
      return 403

    case 'NotFoundError':
      return 404

    case 'ValidationError':
    case 'UseCaseError':
    case 'ServiceError':
      return 400

    case 'NotAcceptableError':
      return 406

    default:
      return 500
  }
}

function mountJson(statusCode: number, error: unknown): HttpResponse {
  const normalizedError = normalizeError(error)
  let message = normalizedError.message ?? 'Erro inesperado'
  let errors: string[] | Record<string, string[]> | undefined

  if (normalizedError.validation) {
    const formattedFields: Record<string, string[]> = {}

    normalizedError.validation.forEach((valErr) => {
      const fieldName = valErr.instancePath.replace(/^\//, '') || 'campo'
      if (!formattedFields[fieldName]) formattedFields[fieldName] = []
      formattedFields[fieldName].push(valErr.message)
    })

    return {
      statusCode,
      success: false,
      error: {
        type: 'ValidationError',
        message: `${normalizedError.validation.length} problema(s) de validação encontrado(s) no formulário.`,
        errors: formattedFields,
      },
    }
  }

  if (normalizedError.errors) {
    errors = normalizedError.errors
    message = `${errors?.length} problema(s) encontrado(s)`
  }

  return {
    statusCode,
    success: false,
    error: {
      type: normalizedError.name || 'BadRequestError',
      message,
      errors,
    },
  }
}
