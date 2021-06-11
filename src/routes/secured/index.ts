import { Router } from 'express';
import users from './users';
import tasks from './tasks';

const routes = Router();
routes.use('/users', users);
routes.use('/tasks', tasks);

export default routes;
