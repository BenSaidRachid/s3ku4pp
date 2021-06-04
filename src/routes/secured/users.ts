import { Router } from 'express';
import UserController from '../../controllers/UserController';
import TaskController from '../../controllers/TaskController';

const routes = Router();

routes.get('/:id', UserController.getOneById);
routes.post('/:id/tasks', TaskController.create);
routes.get('/:id/tasks', TaskController.getAll);

export default routes;
