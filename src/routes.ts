import { Router } from 'express';
import authentication from './middlewares/authentication';

import UserController from './controllers/UserController';

const router = Router();

const userController = new UserController();

router.post('/users/register', userController.create);
router.post('/users/login', userController.authenticate);
router.put('/users/update', authentication, userController.update);
router.delete('/users/delete', authentication, userController.delete);
router.get('/users/verify', authentication, userController.verify);
router.get('/users/profile', authentication, userController.getProfile);

export default router;
