import {
    IServiceRepository,
    PagenatedResponse,
} from '../../repositories/services-repositories/IServicesRepository';

class GetPaginatedServiceUseCase {
    constructor(private readonly ServiceRepository: IServiceRepository) {}

    async execute(page: number, size: number): Promise<PagenatedResponse> {
        return await this.ServiceRepository.getServicesPagenated(page, size);
    }
}

export { GetPaginatedServiceUseCase };
