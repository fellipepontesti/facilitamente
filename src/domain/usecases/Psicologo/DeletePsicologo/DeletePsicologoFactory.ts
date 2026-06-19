import DeletePsicologo from '@domain/usecases/Psicologo/DeletePsicologo/DeletePsicologo'
import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'

export function deletePsicologoFactory(): DeletePsicologo {
  return new DeletePsicologo(new PrismaPsicologoRepository())
}
