import { IServiceRepository } from '../../../repositories/services-repositories/IServicesRepository';

class ReleaseServiceUseCase {
  constructor(private serviceRepository: IServiceRepository) {}

  async execute(id: number) {
    await this.serviceRepository.releaseServiceById(id);
  }
}

export { ReleaseServiceUseCase };
