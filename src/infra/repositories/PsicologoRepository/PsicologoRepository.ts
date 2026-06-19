import type { User } from '@db/prisma/client'
import type {
  CreatePsicologoData,
  Psicologo,
  PsicologoRepository,
  UpdatePsicologoData,
} from '@domain/repositories/PsicologoRepository'
import { prisma } from '@infra/prisma/Client'

function toPsicologo(user: User): Psicologo {
  return {
    id: user.id,
    nome: user.nome,
    email: user.email,
    cpf: user.cpf,
    telefone: user.telefone,
    crp: user.crp ?? '',
    especialidade: user.especialidade,
    abordagem: user.abordagem,
    ativo: user.ativo,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  }
}

export class PrismaPsicologoRepository implements PsicologoRepository {
  async create(data: CreatePsicologoData): Promise<Psicologo> {
    const user = await prisma.user.create({
      data: {
        tipo: 'PSICOLOGO',
        nome: data.nome,
        email: data.email,
        senha: data.senha,
        cpf: data.cpf,
        telefone: data.telefone,
        crp: data.crp,
        especialidade: data.especialidade,
        abordagem: data.abordagem,
      },
    })

    return toPsicologo(user)
  }

  async findMany(): Promise<Psicologo[]> {
    const users = await prisma.user.findMany({
      where: { tipo: 'PSICOLOGO' },
      orderBy: { nome: 'asc' },
    })

    return users.map(toPsicologo)
  }

  async findById(id: string): Promise<Psicologo | null> {
    const user = await prisma.user.findFirst({
      where: { id, tipo: 'PSICOLOGO' },
    })

    return user ? toPsicologo(user) : null
  }

  async findByEmail(email: string): Promise<Psicologo | null> {
    const user = await prisma.user.findFirst({
      where: { email, tipo: 'PSICOLOGO' },
    })

    return user ? toPsicologo(user) : null
  }

  async findByCpf(cpf: string): Promise<Psicologo | null> {
    const user = await prisma.user.findFirst({
      where: { cpf, tipo: 'PSICOLOGO' },
    })

    return user ? toPsicologo(user) : null
  }

  async update(id: string, data: UpdatePsicologoData): Promise<Psicologo> {
    const user = await prisma.user.update({
      where: { id },
      data,
    })

    return toPsicologo(user)
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    })
  }
}
