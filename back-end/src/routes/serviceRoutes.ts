import express from 'express';
import ServiceController from '../controllers/controller';

const router = express.Router();

router.get('/services', ServiceController.getAll);

router.post('/create', ServiceController.create);

router.post('/edit/:id', ServiceController.update);

router.post('/delete/:id', ServiceController.delete);

export default router;
