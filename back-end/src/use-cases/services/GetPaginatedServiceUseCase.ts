import {
    IServiceRepository,
    PagenatedResponse,
} from '../../repositories/services-repositories/IServicesRepository';

class GetPaginatedServiceUseCase {
    constructor(private readonly ServiceRepository: IServiceRepository) {}

    async execute(page: number, size: number): Promise<PagenatedResponse> {
        const offset = (page - 1) * size;

        return await this.ServiceRepository.getServicesPagenated(size, offset);
    }
}

export { GetPaginatedServiceUseCase };
