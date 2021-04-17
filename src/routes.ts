import { Router } from 'express';
import authentication from './middlewares/authentication';
const router = Router();

import { UserController } from './controllers/UserController';

const userController = new UserController();

router.post('/users/register', userController.create);
router.post('/users/login', userController.authenticate);
router.put('/users/update', authentication, userController.update);
router.delete('/users/delete', authentication, userController.delete);

export { router };