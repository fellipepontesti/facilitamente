import CreatePsicologoController from '@ui/controllers/PsicologoControllers/CreatePsicologo'
import DeletePsicologoController from '@ui/controllers/PsicologoControllers/DeletePsicologo'
import GetPsicologoController from '@ui/controllers/PsicologoControllers/GetPsicologo'
import ListPsicologosController from '@ui/controllers/PsicologoControllers/ListPsicologos'
import {
  createPsicologoSchema,
  deletePsicologoSchema,
  getPsicologoSchema,
  listPsicologosSchema,
  updatePsicologoSchema,
} from '@ui/controllers/PsicologoControllers/PsicologoSchemas'
import UpdatePsicologoController from '@ui/controllers/PsicologoControllers/UpdatePsicologo'
import type { FastifyZodInstance } from '@ui/server/app'

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
    '/psicologos/:uuid',
    { schema: getPsicologoSchema },
    new GetPsicologoController().handle,
  )

  app.put(
    '/psicologos/:uuid',
    { schema: updatePsicologoSchema },
    new UpdatePsicologoController().handle,
  )

  app.delete(
    '/psicologos/:uuid',
    { schema: deletePsicologoSchema },
    new DeletePsicologoController().handle,
  )
}
