import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { cr } from './util';
import routerAuth from './router/auth.router';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use('/auth', routerAuth);
app.get('/', (req, res) => res.json(cr.str('aok', 'Hello Citizen')));

export default app;
