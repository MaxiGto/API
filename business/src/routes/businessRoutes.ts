import express from 'express';

import { listUsers } from '../controllers/businessController';
import validateJWT from '../../../middlewares/validateJWT';
import { validateReferer } from '../../../middlewares';



const router = express.Router();

router.get('/list', validateReferer ,validateJWT, listUsers);

export default router;