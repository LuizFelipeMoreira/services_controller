import { Servicos } from '../Models/Services';
import { ServiceType } from '../types/ServicesType';
import { IServiceRepository } from './IServiceRepository';

class ServiceRepository implements IServiceRepository {
  async create(data: ServiceType): Promise<ServiceType> {
    const newService = await Servicos.create(data);
    return newService.toJSON();
  }

  async update(id: number, data: ServiceType): Promise<void> {
    const service = await Servicos.update(data, { where: { id } });

    return service;
  }

  async deleteService(id: number): Promise<void> {
    const serviceDeleted = await Servicos.destroy({ where: { id } });
  }

  async getAll(): Promise<ServiceType[]> {
    const allServices = await Servicos.findAll();

    return allServices.map((service) => service.toJSON());
  }
}

export default new ServiceRepository();
