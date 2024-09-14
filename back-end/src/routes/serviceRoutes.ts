import express from 'express';
import {
  CreateNewService,
  DeleteService,
  EditService,
  GetAllServices,
} from '../controllers/ServicesControllers';
import ServiceController from '../controllers/controller';

const router = express.Router();

router.get('/services', ServiceController.getAll);

router.post('/create', ServiceController.create);

router.post('/edite', EditService);

router.post('/delete/:id', DeleteService);

export default router;
