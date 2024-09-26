import { Servicos } from '../model/Services';
import { ServiceType } from '../@types/ServicesType';
import { IServiceRepository } from './IServicesRepository';

class ServiceRepository implements IServiceRepository {
  async create(data: any): Promise<ServiceType> {
    const newService = await Servicos.create(data);
    return newService.toJSON();
  }

  async update(id: number, data: ServiceType): Promise<void> {
    const service = await Servicos.update(data, { where: { id } });

    return;
  }

  async deleteService(id: number): Promise<void> {
    const serviceDeleted = await Servicos.destroy({ where: { id } });

    return;
  }

  async getAll(): Promise<ServiceType[]> {
    const allServices = await Servicos.findAll();

    return allServices.map((service) => service.toJSON());
  }

  async getServiceByID(id: number): Promise<ServiceType | null> {
    const service = await Servicos.findByPk(id);

    return service ? service.toJSON() : null;
  }
}

export default new ServiceRepository();
