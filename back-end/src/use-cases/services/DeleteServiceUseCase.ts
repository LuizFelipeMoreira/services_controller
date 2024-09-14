import { IServiceRepository } from '../../repositories/IServicesRepository';
import { ServiceType } from '../../@types/ServicesType';

class DeleteServiceUserCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: number): Promise<void> {
    const deletedService = await this.serviceRepository.deleteService(id);

    return;
  }
}

export { DeleteServiceUserCase };
