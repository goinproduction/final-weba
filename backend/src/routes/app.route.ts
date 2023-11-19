import express, { Router } from 'express';
import UserController from '../controllers/app.controller';
import { verifyToken } from '../middlewares/verifyToken';

const appRouter: Router = express.Router();
const controller = new UserController();

appRouter.get('/:userId', controller.getUser);
appRouter.post('/register', controller.register);
appRouter.post('/login', controller.login);
appRouter.put('/:userId', verifyToken, controller.update);

export default appRouter;
