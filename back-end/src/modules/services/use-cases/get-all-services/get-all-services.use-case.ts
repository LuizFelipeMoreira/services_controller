import { ServiceResponseDTO } from '../../dtos/service.dto';
import { ServiceRepositoryInterface } from '../../repositories/service.repository.interface';

class GetAllServicesUseCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute(): Promise<ServiceResponseDTO[]> {
    const services = await this.serviceRepository.getAll();

    return services;
  }
}

export { GetAllServicesUseCase };
