import { Request, Response } from 'express';
import { CreateServiceUserCase } from '../use-cases/services/CreateServiceUseCase';
import { UpdateServiceUserCase } from '../use-cases/services/UpdateServiceUseCase';
import { DeleteServiceUserCase } from '../use-cases/services/DeleteServiceUseCase';
import { GetAllServiceUserCase } from '../use-cases/services/GetAllServicesUseCase';
import ServicesRepository from '../repositories/ServicesRepository';

class ServiceController {
  async create(req: Request, res: Response) {
    const createServiceUseCase = new CreateServiceUserCase(ServicesRepository);
    const service = await createServiceUseCase.execute(req.body);

    return res.status(201).json(service);
  }

  async update(req: Request, res: Response) {
    const updateServiceUseCase = new UpdateServiceUserCase(ServicesRepository);
    const updatedService = await updateServiceUseCase.execute(
      +req.params.id,
      req.body
    );

    return res.status(200).json(updatedService);
  }

  async delete(req: Request, res: Response) {
    const deleteServiceUseCase = new DeleteServiceUserCase(ServicesRepository);
    await deleteServiceUseCase.execute(+req.params.id);

    return res.status(204).send();
  }

  async getAll(req: Request, res: Response) {
    const getAllServicesUseCase = new GetAllServiceUserCase(ServicesRepository);
    const services = await getAllServicesUseCase.execute();

    return res.status(200).json(services);
  }
}

export default new ServiceController();
