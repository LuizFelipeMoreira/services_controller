/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';
import { CreateServiceUserCase } from '../use-cases/services/CreateServiceUseCase';
import { UpdateServiceUserCase } from '../use-cases/services/UpdateServiceUseCase';
import { DeleteServiceUserCase } from '../use-cases/services/DeleteServiceUseCase';
import { GetAllServiceUserCase } from '../use-cases/services/GetAllServicesUseCase';
import { GetServiceByIdUseCase } from '../use-cases/services/GetServiceByIdUseCase';

import ServicesRepository from '../repositories/ServicesRepository';

class ServiceController {
    async create(req: Request, res: Response) {
        const createServiceUseCase = new CreateServiceUserCase(ServicesRepository);
        const service = await createServiceUseCase.execute(req.body);
        return res.status(201).json(service);
    }

    async update(req: Request, res: Response) {
        const updateServiceUseCase = new UpdateServiceUserCase(ServicesRepository);

        if (isNaN(+req.params.id)) throw new Error('Id not number');

        try {
            const updatedService = await updateServiceUseCase.execute(
                +req.params.id,
                req.body
            );

            return res.status(200).json(req.body);
        } catch (error) {
            return res.status(400).json({ message: 'Error ao realizar o update', error });
        }
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

    async getService(req: Request, res: Response) {
        const getServiceByID = new GetServiceByIdUseCase(ServicesRepository);
        const service = await getServiceByID.execute(+req.params.id);

        return res.status(200).json(service);
    }
}

export default new ServiceController();
