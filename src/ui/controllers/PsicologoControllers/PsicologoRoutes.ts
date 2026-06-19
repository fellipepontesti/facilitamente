import type { FastifyZodInstance } from '@ui/server/app'
import CreatePsicologoController from './CreatePsicologo'
import DeletePsicologoController from './DeletePsicologo'
import GetPsicologoController from './GetPsicologo'
import ListPsicologosController from './ListPsicologos'
import {
  createPsicologoSchema,
  deletePsicologoSchema,
  getPsicologoSchema,
  listPsicologosSchema,
  updatePsicologoSchema,
} from './PsicologoSchemas'
import UpdatePsicologoController from './UpdatePsicologo'

export async function psicologoRoutes(app: FastifyZodInstance) {
  app.post(
    '/psicologos',
    { schema: createPsicologoSchema },
    new CreatePsicologoController().handle,
  )

  app.get(
    '/psicologos',
    { schema: listPsicologosSchema },
    new ListPsicologosController().handle,
  )

  app.get(
    '/psicologos/:id',
    { schema: getPsicologoSchema },
    new GetPsicologoController().handle,
  )

  app.put(
    '/psicologos/:id',
    { schema: updatePsicologoSchema },
    new UpdatePsicologoController().handle,
  )

  app.delete(
    '/psicologos/:id',
    { schema: deletePsicologoSchema },
    new DeletePsicologoController().handle,
  )
}
