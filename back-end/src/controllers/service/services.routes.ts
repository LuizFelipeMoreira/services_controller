import express from 'express';
import ServiceController from './servicesController';

const router = express.Router();

router.get('/services', ServiceController.getListPaginated);

router.post('/create', ServiceController.create);

router.post('/edit/:id', ServiceController.update);

router.post('/delete/:id', ServiceController.delete);

router.get('/service/search', ServiceController.getServiceByName);

export default router;
