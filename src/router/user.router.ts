import { Router } from 'express';
import { getAdmin, getUser } from '../controller/user.controller';
import { adminAuthMiddleware, userAuthMiddleware } from '../middleware/auth.middleware';

const routerUser = Router();

routerUser.get('/user', userAuthMiddleware, getUser);

routerUser.get('/admin', adminAuthMiddleware, getAdmin);

export default routerUser;
