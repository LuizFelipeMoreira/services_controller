import { Request, Response } from 'express';
import { CreateServiceUseCase } from '../use-cases/create-service/create-service.use-case';
import { DeleteServiceUseCase } from '../use-cases/delete-service/delete-service.use-case';
import { GetAllServicesUseCase } from '../use-cases/get-all-services/get-all-services.use-case';
import { GetPaginatedServicesUseCase } from '../use-cases/get-paginated-services/get-paginated-services.use-case';
import { GetServiceByIdUseCase } from '../use-cases/get-service-by-id/get-service-by-id.use-case';
import { GetServiceByNameUseCase } from '../use-cases/get-service-by-name/get-service-by-name.use-case';
import { ReleaseServiceUseCase } from '../use-cases/release-service/release-service.use-case';
import { UpdateServiceUseCase } from '../use-cases/update-service/update-service.use-case';

import ServiceRepository from '../repositories/service.repository';

class ServiceController {
  constructor() {}

  public async create(req: Request, res: Response) {
    const createServiceUseCase = new CreateServiceUseCase(ServiceRepository);
    const service = await createServiceUseCase.execute(req.body);

    return res.status(201).json(service);
  }

  public async update(req: Request, res: Response) {
    const updateServiceUseCase = new UpdateServiceUseCase(ServiceRepository);
    if (isNaN(+req.params.id)) throw new Error('Id not number');

    await updateServiceUseCase.execute(+req.params.id, req.body);

    return res.status(200).json(req.body);
  }

  public async delete(req: Request, res: Response) {
    const deleteServiceUseCase = new DeleteServiceUseCase(ServiceRepository);
    await deleteServiceUseCase.execute(+req.params.id);
    return res.status(204).send();
  }

  public async getAll(req: Request, res: Response) {
    void req;

    const getAllServicesUseCase = new GetAllServicesUseCase(ServiceRepository);
    const services = await getAllServicesUseCase.execute();
    return res.status(200).json(services);
  }

  public async getServiceByName(req: Request, res: Response) {
    const nome = req.query.name as string;
    const offset = parseInt(req.query.offset as string) || 0;

    const getServiceByName = new GetServiceByNameUseCase(ServiceRepository);
    const servicesPaginated = await getServiceByName.execute(nome, offset);

    return res.status(200).json(servicesPaginated);
  }

  public async getService(req: Request, res: Response) {
    const getServiceById = new GetServiceByIdUseCase(ServiceRepository);
    const service = await getServiceById.execute(+req.params.id);
    return res.status(200).json(service);
  }

  public async releaseService(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);

    try {
      const releaseServiceUseCase = new ReleaseServiceUseCase(ServiceRepository);
      await releaseServiceUseCase.execute(id);

      return res.status(200).json({ message: 'Serviço Liberado' });
    } catch (error) {
      console.log(error);
    }
  }

  public async getListPaginated(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const getPaginatedServiceUseCase = new GetPaginatedServicesUseCase(ServiceRepository);
    const result = await getPaginatedServiceUseCase.execute(offset, limit);

    res.status(200).json({ ...result });
  }
}

export default new ServiceController();
