import {Router} from 'express';
const router = Router();

import { signUp, signIn } from '../controllers/userController';

router.post('/signUp', signUp);

router.post('/signIn', signIn);

export default router;