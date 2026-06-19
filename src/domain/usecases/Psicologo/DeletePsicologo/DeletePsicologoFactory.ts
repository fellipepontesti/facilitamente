import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'
import DeletePsicologo from './DeletePsicologo'

export function deletePsicologoFactory(): DeletePsicologo {
  return new DeletePsicologo(new PrismaPsicologoRepository())
}
