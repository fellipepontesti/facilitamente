import UpdatePsicologo from '@domain/usecases/Psicologo/UpdatePsicologo/UpdatePsicologo'
import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'

export function updatePsicologoFactory(): UpdatePsicologo {
  return new UpdatePsicologo(new PrismaPsicologoRepository())
}
