import express from 'express';
import ServiceController from './services-controller';

const router = express.Router();

router.get('/services', ServiceController.getListPaginated);

router.post('/create', ServiceController.create);

router.post('/edit/:id', ServiceController.update);

router.post('/delete/:id', ServiceController.delete);

router.get('/service/:id', ServiceController.getService);

//router.get('/services/paginated', ServiceController.getListPaginated);

export default router;
