/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { CreateServiceUserCase } from '../../use-cases/services/CreateServiceUseCase';
import { DeleteServiceUserCase } from '../../use-cases/services/DeleteServiceUseCase';
import { GetAllServiceUserCase } from '../../use-cases/services/GetAllServicesUseCase';
import { GetPaginatedServiceUseCase } from '../../use-cases/services/GetPaginatedServiceUseCase';
import { GetServiceByIdUseCase } from '../../use-cases/services/GetServiceByIdUseCase';
import { GetServiceByNameUseCase } from '../../use-cases/services/GetServiceByNameUseCase';
import { ReleaseServiceUseCase } from '../../use-cases/services/ReleaseServiceUseCase';
import { UpdateServiceUserCase } from '../../use-cases/services/UpdateServiceUseCase';

import ServicesRepository from '../../repositories/services-repositories/ServicesRepository';

class ServiceController {
    constructor() {}

    public async create(req: Request, res: Response) {
        const createServiceUseCase = new CreateServiceUserCase(ServicesRepository);
        const service = await createServiceUseCase.execute(req.body);

        return res.status(201).json(service);
    }

    public async update(req: Request, res: Response) {
        const updateServiceUseCase = new UpdateServiceUserCase(ServicesRepository);
        if (isNaN(+req.params.id)) throw new Error('Id not number');

        const updatedService = await updateServiceUseCase.execute(
            +req.params.id,
            req.body
        );

        return res.status(200).json(req.body);
    }

    public async delete(req: Request, res: Response) {
        const deleteServiceUseCase = new DeleteServiceUserCase(ServicesRepository);
        await deleteServiceUseCase.execute(+req.params.id);
        return res.status(204).send();
    }

    public async getAll(req: Request, res: Response) {
        const getAllServicesUseCase = new GetAllServiceUserCase(ServicesRepository);
        const services = await getAllServicesUseCase.execute();
        return res.status(200).json(services);
    }

    public async getServiceByName(req: Request, res: Response) {
        const nome = req.query.name as string;
        const offset = parseInt(req.query.offset as string) || 0;

        const getServiceByName = new GetServiceByNameUseCase(ServicesRepository);
        const servicesPaginated = await getServiceByName.execute(nome, offset);

        return res.status(200).json(servicesPaginated);
    }

    public async getService(req: Request, res: Response) {
        const getServiceByID = new GetServiceByIdUseCase(ServicesRepository);
        const service = await getServiceByID.execute(+req.params.id);
        return res.status(200).json(service);
    }

    public async releaseService(req: Request, res: Response) {
        const id = parseInt(req.params.id as string);

        try {
            const releaseServiceUseCase = new ReleaseServiceUseCase(ServicesRepository);
            await releaseServiceUseCase.execute(id);

            return res.status(200).json({ message: 'Serviço Liberado' });
        } catch (error) {
            console.log(error);
        }
    }

    public async getListPaginated(req: Request, res: Response) {
        const limit = parseInt(req.query.limit as string) || 10;
        const offset = parseInt(req.query.offset as string) || 0;

        const getPaginatedServiceUseCase = new GetPaginatedServiceUseCase(
            ServicesRepository
        );
        const result = await getPaginatedServiceUseCase.execute(offset, limit);

        res.status(200).json({ ...result });
    }
}

export default new ServiceController();
