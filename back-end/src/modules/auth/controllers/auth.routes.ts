import express from 'express';
import AuthController from './auth.controller';

const router = express.Router();

router.post('/signup', AuthController.signUp);

router.post('/signin', AuthController.signIn);

router.get('/me', AuthController.getMe);

export default router;
