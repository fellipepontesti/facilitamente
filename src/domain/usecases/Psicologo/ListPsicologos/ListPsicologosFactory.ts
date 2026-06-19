import ListPsicologos from '@domain/usecases/Psicologo/ListPsicologos/ListPsicologos'
import { PrismaPsicologoRepository } from '@infra/repositories/PsicologoRepository/PsicologoRepository'

export function listPsicologosFactory(): ListPsicologos {
  return new ListPsicologos(new PrismaPsicologoRepository())
}
