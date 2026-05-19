import express from 'express';
import AuthController from './authenticateController';

const router = express.Router();

router.post('/signup', AuthController.signUp);

router.post('/signin', AuthController.signIn);

router.get('/me', AuthController.getMe);

export default router;
