import express from 'express';
import ServiceController from './servicesController';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

const router = express.Router();

router.get('/services', ensureAuthenticated, ServiceController.getListPaginated);

router.get('/services/search', ensureAuthenticated, ServiceController.getServiceByName);

router.get('/services/:id', ensureAuthenticated, ServiceController.getService);

router.post('/services', ensureAuthenticated, ServiceController.create);

router.put('/services/:id', ensureAuthenticated, ServiceController.update);

router.delete('/services/:id', ensureAuthenticated, ServiceController.delete);

router.patch('/services/:id/release', ensureAuthenticated, ServiceController.releaseService);

export default router;
