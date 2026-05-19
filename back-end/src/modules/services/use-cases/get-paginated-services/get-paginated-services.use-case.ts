import {
  PaginatedResponse,
  ServiceRepositoryInterface,
} from '../../repositories/service.repository.interface';

class GetPaginatedServicesUseCase {
  constructor(private readonly serviceRepository: ServiceRepositoryInterface) {}

  async execute(page: number, size: number): Promise<PaginatedResponse> {
    const offset = (page - 1) * size;

    return await this.serviceRepository.getServicesPaginated(size, offset);
  }
}

export { GetPaginatedServicesUseCase };
