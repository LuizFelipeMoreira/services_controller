import { ServiceNotFound } from '../../../helpers/ApiErrors';
import { IServiceRepository } from '../../../repositories/services-repositories/IServicesRepository';
import { GetServiceByIdUseCase } from '../getServiceById/GetServiceByIdUseCase';

class DeleteServiceUserCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: number): Promise<void> {
    const GetServiceById = new GetServiceByIdUseCase(this.serviceRepository);
    const existingService = await GetServiceById.execute(id);

    if (!existingService) throw new ServiceNotFound();

    await this.serviceRepository.deleteService(id);

    return;
  }
}

export { DeleteServiceUserCase };
