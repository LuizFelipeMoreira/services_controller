import express from 'express';
import AuthController from './authenticate.controller';

const router = express.Router();

router.post('/singup', AuthController.signUp);

router.post('/signin', AuthController.signIn);

router.post('/logout', AuthController.logout);

export default router;
