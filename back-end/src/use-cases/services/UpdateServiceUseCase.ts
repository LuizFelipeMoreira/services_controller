import { IServiceRepository } from '../../repositories/IServicesRepository';
import { ServiceType } from '../../@types/ServicesType';

class UpdateServiceUserCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: number, data: ServiceType): Promise<void> {
    const updatedService = await this.serviceRepository.update(id, data);

    return;
  }
}

export { UpdateServiceUserCase };
