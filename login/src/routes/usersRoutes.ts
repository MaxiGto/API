import express from 'express';

import { listUsers, authenticateUser, createUser } from '../controllers/userController';
import validateJWT from '../../../middlewares/validateJWT';

const router = express.Router();

router.get('/list', validateJWT, listUsers);

router.post('/register', createUser);
router.post('/auth', authenticateUser);

export default router;