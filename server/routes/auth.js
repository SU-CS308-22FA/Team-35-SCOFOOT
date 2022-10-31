import express from 'express';

import { getUsers, createUser, signIn } from '../controllers/auth.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/sign-in', signIn);

export default router;