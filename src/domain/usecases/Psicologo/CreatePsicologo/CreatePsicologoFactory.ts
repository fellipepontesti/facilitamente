import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'
import CreatePsicologo from './CreatePsicologo'

export function createPsicologoFactory(): CreatePsicologo {
  return new CreatePsicologo(new PrismaPsicologoRepository())
}
