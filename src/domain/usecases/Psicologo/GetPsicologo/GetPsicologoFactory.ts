import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'
import GetPsicologo from './GetPsicologo'

export function getPsicologoFactory(): GetPsicologo {
  return new GetPsicologo(new PrismaPsicologoRepository())
}
