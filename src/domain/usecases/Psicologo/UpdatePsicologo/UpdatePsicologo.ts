import type {
  Psicologo,
  PsicologoRepository,
  UpdatePsicologoData,
} from '@domain/repositories/PsicologoRepository'
import NotFoundError from '@shared/errors/NotFoundError'
import ValidationError from '@shared/errors/ValidationError'

export default class UpdatePsicologo {
  constructor(private readonly psicologoRepository: PsicologoRepository) {}

  async call(id: string, data: UpdatePsicologoData): Promise<Psicologo> {
    const psicologo = await this.psicologoRepository.findById(id)

    if (!psicologo) {
      throw new NotFoundError('Psicólogo não encontrado')
    }

    if (data.email && data.email !== psicologo.email) {
      const emailAlreadyExists = await this.psicologoRepository.findByEmail(
        data.email,
      )

      if (emailAlreadyExists) {
        throw new ValidationError('Já existe um psicólogo com este e-mail')
      }
    }

    if (data.cpf && data.cpf !== psicologo.cpf) {
      const cpfAlreadyExists = await this.psicologoRepository.findByCpf(
        data.cpf,
      )

      if (cpfAlreadyExists) {
        throw new ValidationError('Já existe um psicólogo com este CPF')
      }
    }

    return this.psicologoRepository.update(id, data)
  }
}
