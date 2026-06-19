import CreatePsicologo from '@domain/usecases/Psicologo/CreatePsicologo/CreatePsicologo'
import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'

export function createPsicologoFactory(): CreatePsicologo {
  return new CreatePsicologo(new PrismaPsicologoRepository())
}
