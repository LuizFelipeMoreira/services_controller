import { ServiceNotFound } from '../../../../helpers/api-errors';
import { ServiceRepositoryInterface } from '../../repositories/service.repository.interface';
import { GetServiceByIdUseCase } from '../get-service-by-id/get-service-by-id.use-case';

class DeleteServiceUseCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: number): Promise<void> {
    const getServiceById = new GetServiceByIdUseCase(this.serviceRepository);
    const existingService = await getServiceById.execute(id);

    if (!existingService) throw new ServiceNotFound();

    await this.serviceRepository.deleteService(id);

    return;
  }
}

export { DeleteServiceUseCase };
