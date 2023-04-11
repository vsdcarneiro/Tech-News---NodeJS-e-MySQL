import { Router } from 'express';
import usersController from '../controllers/users.js';
import { adminAuthenticate } from '../middlewares/adminAuth.js';
import { createAccountLimiter } from '../middlewares/limitRequests.js';

const router = Router();

router.get(
  '/admin/users/new',
  [adminAuthenticate, createAccountLimiter],
  usersController.newUser,
);
router.post('/users/create', usersController.createUser);
router.get('/admin/users', adminAuthenticate, usersController.getUsers);
router.get('/users/login', usersController.loginUser);
router.post('/users/authenticate', usersController.authenticateUser);
router.get('/users/logout', usersController.logoutUser);

export default router;
