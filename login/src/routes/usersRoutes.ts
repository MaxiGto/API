import express from 'express';

import { authenticateUser, createUser } from '../controllers/userController';

const router = express.Router();


router.post('/register', createUser);
router.post('/auth', authenticateUser);

export default router;