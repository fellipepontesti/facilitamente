import { validarCPF } from '@shared/helpers/cpf'
import { phoneRegex } from '@shared/helpers/telefone'
import { standardResponse } from '@ui/controllers/helpers/standardResponse'
import { z } from 'zod'

export const createPsicologoSchema = {
  body: z.object({
    nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().email('E-mail inválido'),
    senha: z
      .string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .regex(
        /[A-Z]/,
        'A senha deve conter pelo menos uma barra/letra maiúscula',
      )
      .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
      .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
      .regex(
        /[^A-Za-z0-9]/,
        'A senha deve conter pelo menos um caractere especial (@, #, $, etc.)',
      ),
    cpf: z
      .string()
      .transform((val) => val.replace(/\D/g, '')) // remove o que não for número
      .refine(validarCPF, { message: 'CPF inválido ou inexistente' }),
    telefone: z
      .string()
      .regex(phoneRegex, 'Formato de telefone inválido. Use (XX) 9XXXX-XXXX'),
    crp: z.string().min(4, 'O CRP é obrigatório para o cadastro de psicólogos'),
    especialidade: z.string().optional(),
    abordagem: z.string().optional(),
  }),

  response: standardResponse(
    z.object({
      id: z.string(),
      nome: z.string(),
      crp: z.string(),
      email: z.string(),
      telefone: z.string(),
      especialidade: z.string().optional(),
      abordagem: z.string().optional(),
    }),
  ),
}
