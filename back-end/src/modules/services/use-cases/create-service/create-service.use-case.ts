import { CreateServiceDTO, ServiceResponseDTO } from '../../dtos/service.dto';
import { ServiceRepositoryInterface } from '../../repositories/service.repository.interface';

class CreateServiceUseCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute(data: CreateServiceDTO): Promise<ServiceResponseDTO> {
    const newService = await this.serviceRepository.create(data);

    return newService;
  }
}

export { CreateServiceUseCase };
