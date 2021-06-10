import { Router } from 'express';
import UserController from '../../controllers/UserController';
import ServiceController from '../../controllers/ServiceController';
import TaskController from '../../controllers/TaskController';

const routes = Router();

routes.get('/:id', UserController.getOneById);
routes.get('/:id/api-token', ServiceController.getApiToken);
routes.post('/:id/tasks', TaskController.create);
routes.get('/:id/tasks', TaskController.getAll);

export default routes;
