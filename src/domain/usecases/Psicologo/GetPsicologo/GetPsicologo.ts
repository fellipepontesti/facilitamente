import type {
  Psicologo,
  PsicologoRepository,
} from '@domain/repositories/PsicologoRepository'
import NotFoundError from '@shared/errors/NotFoundError'

export default class GetPsicologo {
  constructor(private readonly psicologoRepository: PsicologoRepository) {}

  async call(uuid: string): Promise<Psicologo> {
    const psicologo = await this.psicologoRepository.findByUuid(uuid)

    if (!psicologo) {
      throw new NotFoundError('Psicólogo não encontrado')
    }

    return psicologo
  }
}
