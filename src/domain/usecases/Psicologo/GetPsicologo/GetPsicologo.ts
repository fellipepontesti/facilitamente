import type {
  Psicologo,
  PsicologoRepository,
} from '@domain/repositories/PsicologoRepository'
import NotFoundError from '@shared/errors/NotFoundError'

export default class GetPsicologo {
  constructor(private readonly psicologoRepository: PsicologoRepository) {}

  async call(id: string): Promise<Psicologo> {
    const psicologo = await this.psicologoRepository.findById(id)

    if (!psicologo) {
      throw new NotFoundError('Psicólogo não encontrado')
    }

    return psicologo
  }
}
