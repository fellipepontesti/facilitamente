import { z } from 'zod'

export const errorResponseSchema = z.object({
  statusCode: z.number(),
  success: z.boolean(),
  error: z.object({
    type: z.string(),
    message: z.string(),
    errors: z
      .union([z.array(z.string()), z.record(z.string(), z.array(z.string()))])
      .optional(),
  }),
})

export function standardResponse<T extends z.ZodTypeAny>(successSchema: T) {
  return {
    201: successSchema,
    200: successSchema,

    400: errorResponseSchema,
    401: errorResponseSchema,
    403: errorResponseSchema,
    404: errorResponseSchema,
    406: errorResponseSchema,
    409: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
    500: errorResponseSchema,
  }
}
