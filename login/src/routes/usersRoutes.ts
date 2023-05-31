import express from 'express';

import { listUsers, authenticateUser, createUser } from '../controllers/userController';
import { validateJWT, validateUserCredentials, validateAuthCredentials, validatePaginationParams } from '../../../middlewares/index';


const router = express.Router();

router.get('/list', validateJWT, validatePaginationParams, listUsers);

router.post('/register', validateUserCredentials, createUser);
router.post('/auth', validateAuthCredentials, authenticateUser);

export default router;