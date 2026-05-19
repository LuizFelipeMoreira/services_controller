import { ServiceNotFound } from '../../../../helpers/api-errors';
import { ServiceResponseDTO } from '../../dtos/service.dto';
import { ServiceRepositoryInterface } from '../../repositories/service.repository.interface';

class GetServiceByIdUseCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: number): Promise<ServiceResponseDTO> {
    const service = await this.serviceRepository.getServiceById(id);

    if (!service) throw new ServiceNotFound();

    return service;
  }
}
export { GetServiceByIdUseCase };
