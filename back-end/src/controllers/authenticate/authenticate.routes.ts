import express from 'express';
import AuthController from './authenticate.controller';

const router = express.Router();

router.post('/auth', AuthController.create);

router.post('/login', AuthController.login);

router.post('/logout', AuthController.logout);

export default router;
