import { ServiceNotFound } from '../../../../helpers/api-errors';
import {
  PaginatedResponse,
  ServiceRepositoryInterface,
} from '../../repositories/service.repository.interface';

class GetServiceByNameUseCase {
  constructor(private serviceRepository: ServiceRepositoryInterface) {}

  async execute(name: string, page: number): Promise<PaginatedResponse> {
    const offset = page > 0 ? (page - 1) * 10 : page;
    const service = await this.serviceRepository.getServiceByName(name, offset);

    if (!service) throw new ServiceNotFound();

    return service;
  }
}
export { GetServiceByNameUseCase };
