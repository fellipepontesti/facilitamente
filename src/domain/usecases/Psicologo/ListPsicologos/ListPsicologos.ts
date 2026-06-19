import type {
  Psicologo,
  PsicologoRepository,
} from '@domain/repositories/PsicologoRepository'

export default class ListPsicologos {
  constructor(private readonly psicologoRepository: PsicologoRepository) {}

  async call(): Promise<Psicologo[]> {
    return this.psicologoRepository.findMany()
  }
}
