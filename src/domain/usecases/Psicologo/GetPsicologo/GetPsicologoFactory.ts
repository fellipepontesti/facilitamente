import GetPsicologo from '@domain/usecases/Psicologo/GetPsicologo/GetPsicologo'
import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'

export function getPsicologoFactory(): GetPsicologo {
  return new GetPsicologo(new PrismaPsicologoRepository())
}
