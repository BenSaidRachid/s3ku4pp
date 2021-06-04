import { Router } from 'express';
import TaskController from '../../controllers/TaskController';

const routes = Router();

routes.put('/:id', TaskController.edit);
routes.delete('/:id', TaskController.delete);

export default routes;
