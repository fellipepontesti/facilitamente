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

function getStatus(error: any): number {
  if (error.validation) {
    return 400
  }

  switch (error.name) {
    case 'UnauthorizedError':
      return 401

    case 'ForbiddenError':
      return 403

    case 'NotFoundError':
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

function mountJson(statusCode: number, error: any): HttpResponse {
  let message = error.message
  let errors: any

  if (error.validation) {
    const formattedFields: Record<string, string[]> = {}

    error.validation.forEach((valErr: any) => {
      const fieldName = valErr.instancePath.replace(/^\//, '') || 'campo'
      if (!formattedFields[fieldName]) formattedFields[fieldName] = []
      formattedFields[fieldName].push(valErr.message)
    })

    return {
      statusCode,
      success: false,
      error: {
        type: 'ValidationError',
        message: `${error.validation.length} problema(s) de validação encontrado(s) no formulário.`,
        errors: formattedFields,
      },
    }
  }

  if (error.errors) {
    errors = error.errors
    message = `${errors?.length} problema(s) encontrado(s)`
  }

  return {
    statusCode,
    success: false,
    error: {
      type: error.name || 'BadRequestError',
      message,
      errors,
    },
  }
}
