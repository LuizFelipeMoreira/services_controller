import { ServiceRepositoryInterface } from '../../repositories/service.repository.interface';

class ReleaseServiceUseCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute(id: number) {
    await this.serviceRepository.releaseServiceById(id);
  }
}

export { ReleaseServiceUseCase };
