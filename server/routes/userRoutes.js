import express from 'express';
import { registerUser, loginUser } from '../controllers/userControllers.js';

const router = express.Router();

router.route('/signup').post(registerUser);

router.route('/login').post(loginUser);

export default router;