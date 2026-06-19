import type { PsicologoRepository } from '@domain/repositories/PsicologoRepository'
import NotFoundError from '@shared/errors/NotFoundError'

export default class DeletePsicologo {
  constructor(private readonly psicologoRepository: PsicologoRepository) {}

  async call(id: string): Promise<void> {
    const psicologo = await this.psicologoRepository.findById(id)

    if (!psicologo) {
      throw new NotFoundError('Psicólogo não encontrado')
    }

    await this.psicologoRepository.delete(id)
  }
}
