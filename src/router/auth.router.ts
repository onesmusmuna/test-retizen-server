import { Router } from 'express';
import { postLogin, postRegister } from '../controller/auth.controller';

const routerAuth = Router();

routerAuth.post('/register', postRegister);

routerAuth.post('/login', postLogin);

export default routerAuth;
