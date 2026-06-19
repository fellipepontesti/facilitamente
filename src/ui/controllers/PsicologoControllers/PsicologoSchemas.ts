import { validarCPF } from '@shared/helpers/cpf'
import { phoneRegex } from '@shared/helpers/telefone'
import { standardResponse } from '@ui/controllers/helpers/standardResponse'
import { z } from 'zod'

const cpfSchema = z
  .string()
  .transform((val) => val.replace(/\D/g, ''))
  .refine(validarCPF, { message: 'CPF inválido ou inexistente' })

const senhaSchema = z
  .string()
  .min(8, 'A senha deve ter pelo menos 8 caracteres')
  .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
  .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
  .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
  .regex(
    /[^A-Za-z0-9]/,
    'A senha deve conter pelo menos um caractere especial (@, #, $, etc.)',
  )

export const psicologoResponseSchema = z.object({
  id: z.string(),
  nome: z.string(),
  email: z.string(),
  cpf: z.string(),
  telefone: z.string(),
  crp: z.string(),
  especialidade: z.string().nullable(),
  abordagem: z.string().nullable(),
  ativo: z.boolean(),
})

export const psicologoIdParamsSchema = z.object({
  id: z.string().uuid('ID inválido'),
})

export const createPsicologoBodySchema = z.object({
  nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  senha: senhaSchema,
  cpf: cpfSchema,
  telefone: z
    .string()
    .regex(phoneRegex, 'Formato de telefone inválido. Use (XX) 9XXXX-XXXX'),
  crp: z.string().min(4, 'O CRP é obrigatório para o cadastro de psicólogos'),
  especialidade: z.string().optional(),
  abordagem: z.string().optional(),
})

export const updatePsicologoBodySchema = z
  .object({
    nome: z
      .string()
      .min(3, 'O nome deve ter pelo menos 3 caracteres')
      .optional(),
    email: z.string().email('E-mail inválido').optional(),
    senha: senhaSchema.optional(),
    cpf: cpfSchema.optional(),
    telefone: z
      .string()
      .regex(phoneRegex, 'Formato de telefone inválido. Use (XX) 9XXXX-XXXX')
      .optional(),
    crp: z
      .string()
      .min(4, 'O CRP é obrigatório para o cadastro de psicólogos')
      .optional(),
    especialidade: z.string().nullable().optional(),
    abordagem: z.string().nullable().optional(),
    ativo: z.boolean().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Envie pelo menos um campo para atualizar',
  })

export const createPsicologoSchema = {
  body: createPsicologoBodySchema,
  response: standardResponse(psicologoResponseSchema),
}

export const listPsicologosSchema = {
  response: standardResponse(z.array(psicologoResponseSchema)),
}

export const getPsicologoSchema = {
  params: psicologoIdParamsSchema,
  response: standardResponse(psicologoResponseSchema),
}

export const updatePsicologoSchema = {
  params: psicologoIdParamsSchema,
  body: updatePsicologoBodySchema,
  response: standardResponse(psicologoResponseSchema),
}

export const deletePsicologoSchema = {
  params: psicologoIdParamsSchema,
  response: {
    204: z.null(),
    ...standardResponse(psicologoResponseSchema),
  },
}

export type CreatePsicologoBody = z.infer<typeof createPsicologoBodySchema>
export type UpdatePsicologoBody = z.infer<typeof updatePsicologoBodySchema>
export type PsicologoIdParams = z.infer<typeof psicologoIdParamsSchema>
