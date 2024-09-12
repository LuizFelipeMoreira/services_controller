import { IServiceRepository } from '../../repositories/IServicesRepository';
import { ServiceType } from '../../types/ServicesType';

class GetAllServiceUserCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(): Promise<ServiceType[]> {
    const services = await this.serviceRepository.getAll();

    return services;
  }
}

export { GetAllServiceUserCase };
