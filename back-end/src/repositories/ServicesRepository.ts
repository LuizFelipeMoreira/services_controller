import { Servicos } from '../model/Services';
import { ServiceType } from '../types/ServicesType';
import { IServiceRepository } from './IServicesRepository';

class ServiceRepository implements IServiceRepository {
  async create(data: any): Promise<ServiceType> {
    const newService = await Servicos.create(data);
    return newService.toJSON();
  }

  async update(id: number, data: ServiceType): Promise<void> {
    const service = await Servicos.update(data, { where: { id } });

    return;
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
}

export default new ServiceRepository();
