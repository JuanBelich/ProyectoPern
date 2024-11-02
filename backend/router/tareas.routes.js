import  Router  from "express-promise-router";
import { actualizarTarea, crearTarea, eliminarTarea, listarTarea, listarTareas } from "../controllers/tareas.controller.js";
import  {isAuth} from "../middlewares/auth.middlewares.js"
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTreasSchema, updateTreasSchema } from "../schemas/tareas.schema.js";

const router = Router();

//listado de tareas
router.get('/tareas', isAuth, listarTareas );

//obtencion de una tarea
router.get('/tareas/:id',isAuth, listarTarea );

//cuando el usuario cree una tarea va a ser a traves del metodo post
router.post('/tareas',isAuth, validateSchema(createTreasSchema), crearTarea);

//actualizar una tarea
router.put('/tareas/:id',isAuth, validateSchema(updateTreasSchema), actualizarTarea);

//eliminar una tarea
router.delete('/tareas/:id',isAuth, eliminarTarea);

export default router;