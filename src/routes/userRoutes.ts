import express from 'express';
import * as useController from '../controllers/userControllers';

const router = express.Router();

router.post('/create', useController.createUser);

export default router;
