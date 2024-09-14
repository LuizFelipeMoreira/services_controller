import { IServiceRepository } from '../../repositories/IServicesRepository';
import { ServiceType } from '../../@types/ServicesType';

class CreateServiceUserCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(data: ServiceType): Promise<ServiceType> {
    const newService = await this.serviceRepository.create(data);

    return newService;
  }
}

export { CreateServiceUserCase };
