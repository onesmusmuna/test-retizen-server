import { Router } from 'express';
import { userAuthMiddleware } from '../middleware/auth.middleware';
import { getPosts, postPost } from '../controller/post.controller';

const routerPost = Router();

routerPost.get('/', getPosts);

routerPost.post('/create', userAuthMiddleware, postPost);

export default routerPost;
