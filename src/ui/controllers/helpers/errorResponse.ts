import type { FastifyReply } from 'fastify'
import { ZodError } from 'zod'

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
    instancePath?: string
    path?: Array<string | number>
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

  if (normalizedError.name === 'PrismaClientKnownRequestError') {
    const code = (error as { code?: string }).code
    if (code === 'P2025') return 404
    return 400
  }

  if (normalizedError.name === 'PrismaClientValidationError') {
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
  if (error instanceof ZodError) {
    const formattedFields: Record<string, string[]> = {}
    error.issues.forEach((issue) => {
      const fieldName = issue.path.join('.') || 'campo'
      if (!formattedFields[fieldName]) formattedFields[fieldName] = []
      formattedFields[fieldName].push(issue.message)
    })
    return {
      statusCode: 400,
      success: false,
      error: {
        type: 'ValidationError',
        message: `${error.issues.length} problema(s) de validação encontrado(s).`,
        errors: formattedFields,
      },
    }
  }

  const normalizedError = normalizeError(error)

  if (normalizedError.name === 'PrismaClientKnownRequestError') {
    const prismaError = error as { code?: string; meta?: { target?: string[] } }
    let msg = 'Erro na operação do banco de dados.'
    const code = prismaError.code

    if (code === 'P2002') {
      const targets = prismaError.meta?.target || []
      msg = `Já existe um registro com este(s) campo(s): ${targets.join(', ')}.`
    } else if (code === 'P2025') {
      msg = 'O registro solicitado não foi encontrado.'
    } else {
      msg = `Erro na operação do banco de dados (Código: ${code}).`
    }

    return {
      statusCode,
      success: false,
      error: {
        type: 'DatabaseError',
        message: msg,
      },
    }
  }

  if (normalizedError.name === 'PrismaClientValidationError') {
    return {
      statusCode: 400,
      success: false,
      error: {
        type: 'ValidationError',
        message:
          'Dados inválidos ou ausentes para a operação de banco de dados.',
      },
    }
  }

  let message = normalizedError.message ?? 'Erro inesperado'
  let errors: string[] | Record<string, string[]> | undefined

  if (normalizedError.validation) {
    const formattedFields: Record<string, string[]> = {}

    normalizedError.validation.forEach((valErr) => {
      let fieldName = 'campo'
      if (valErr.instancePath !== undefined) {
        fieldName = valErr.instancePath.replace(/^\//, '') || 'campo'
      } else if (valErr.path !== undefined && Array.isArray(valErr.path)) {
        fieldName = valErr.path.join('.') || 'campo'
      }
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
