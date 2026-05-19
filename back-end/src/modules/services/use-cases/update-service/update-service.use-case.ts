import { ServiceNotFound } from '../../../../helpers/api-errors';
import { CreateServiceDTO } from '../../dtos/service.dto';
import { ServiceRepositoryInterface } from '../../repositories/service.repository.interface';
import { GetServiceByIdUseCase } from '../get-service-by-id/get-service-by-id.use-case';

class UpdateServiceUseCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: number, data: CreateServiceDTO): Promise<void> {
    const getServiceById = new GetServiceByIdUseCase(this.serviceRepository);
    const existingService = await getServiceById.execute(id);

    if (!existingService) throw new ServiceNotFound();
    await this.serviceRepository.update(id, data);
  }
}

export { UpdateServiceUseCase };
