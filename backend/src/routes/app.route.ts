import express, { Router } from 'express';
import UserController from '../controllers/app.controller';
import { verifyToken } from '../middlewares/verifyToken';
import passport from 'passport';

const appRouter: Router = express.Router();
const controller = new UserController();

appRouter.get('/:userId', controller.getUser);
appRouter.post('/register', controller.register);
appRouter.post('/login', controller.login);
appRouter.put('/:userId', verifyToken, controller.update);
appRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
appRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/login/fail',
    successRedirect: process.env.WEB_URL,
  })
);
appRouter.get('/login/success', controller.successLogin);
appRouter.get('/login/fail', controller.failedLogin);
export default appRouter;
