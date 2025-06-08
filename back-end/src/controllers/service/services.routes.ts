import express from 'express';
import ServiceController from './servicesController';
import { ensureAuthenticated } from '../../middlewares/ensureAuthenticated';

const router = express.Router();

router.get('/services', ensureAuthenticated, ServiceController.getListPaginated);

router.post('/create', ensureAuthenticated, ServiceController.create);

router.post('/edit/:id', ensureAuthenticated, ServiceController.update);

router.post('/delete/:id', ensureAuthenticated, ServiceController.delete);

router.post('/release/:id', ensureAuthenticated, ServiceController.releaseService);

router.get('/service/search', ensureAuthenticated, ServiceController.getServiceByName);

export default router;
