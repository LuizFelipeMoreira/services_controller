import { IService } from '../../@types/IService';
import { Servicos } from '../../database/model/Services';
import { IServiceRepository } from '../services-repositories/IServicesRepository';

class ServiceRepository implements IServiceRepository {
    async create(data: any): Promise<IService> {
        const newService = await Servicos.create(data);
        return newService.toJSON();
    }

    async update(id: number, data: IService): Promise<void> {
        const service = await Servicos.update(data, { where: { id } });

        return;
    }

    async deleteService(id: number): Promise<void> {
        const serviceDeleted = await Servicos.destroy({ where: { id } });

        return;
    }

    async getAll(): Promise<IService[]> {
        const allServices = await Servicos.findAll();

        return allServices.map((service) => service.toJSON());
    }

    async getServiceByID(id: number): Promise<IService | null> {
        const service = await Servicos.findByPk(id);

        return service ? service.toJSON() : null;
    }
}

export default new ServiceRepository();
