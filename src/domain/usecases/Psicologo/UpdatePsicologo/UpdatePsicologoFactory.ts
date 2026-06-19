import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'
import UpdatePsicologo from './UpdatePsicologo'

export function updatePsicologoFactory(): UpdatePsicologo {
  return new UpdatePsicologo(new PrismaPsicologoRepository())
}
