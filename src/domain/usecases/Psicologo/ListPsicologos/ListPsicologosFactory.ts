import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'
import ListPsicologos from './ListPsicologos'

export function listPsicologosFactory(): ListPsicologos {
  return new ListPsicologos(new PrismaPsicologoRepository())
}
