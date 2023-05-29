import express from 'express';

import { listUsers } from '../controllers/businessController';
import validateJWT from '../../../middlewares/validateJWT';



const router = express.Router();

router.get('/list', validateJWT, listUsers);

export default router;