import { CreateServiceDTO, ServiceResponseDTO } from '../../../@types/IService';
import { IServiceRepository } from '../../../repositories/services-repositories/IServicesRepository';

class CreateServiceUserCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(data: CreateServiceDTO): Promise<ServiceResponseDTO> {
    const newService = await this.serviceRepository.create(data);

    return newService;
  }
}

export { CreateServiceUserCase };
