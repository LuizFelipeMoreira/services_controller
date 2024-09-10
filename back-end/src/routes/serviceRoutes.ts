import express from 'express';
import {
  CreateNewService,
  DeleteService,
  EditService,
  GetAllServices,
} from '../controllers/ServicesControllers';

const router = express.Router();

router.get('/services', GetAllServices);

router.post('/create', CreateNewService);

router.post('/edite', EditService);

router.post('/delete/:id', DeleteService);

export default router;
