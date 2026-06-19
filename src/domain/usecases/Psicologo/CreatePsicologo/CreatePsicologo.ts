import type {
  CreatePsicologoData,
  Psicologo,
  PsicologoRepository,
} from '@domain/repositories/PsicologoRepository'
import ValidationError from '@shared/errors/ValidationError'

export default class CreatePsicologo {
  constructor(private readonly psicologoRepository: PsicologoRepository) {}

  async call(data: CreatePsicologoData): Promise<Psicologo> {
    const emailAlreadyExists = await this.psicologoRepository.findByEmail(
      data.email,
    )

    if (emailAlreadyExists) {
      throw new ValidationError('Já existe um psicólogo com este e-mail')
    }

    const cpfAlreadyExists = await this.psicologoRepository.findByCpf(data.cpf)

    if (cpfAlreadyExists) {
      throw new ValidationError('Já existe um psicólogo com este CPF')
    }

    return this.psicologoRepository.create(data)
  }
}
