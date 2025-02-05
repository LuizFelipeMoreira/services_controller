import {
    IServiceRepository,
    PagenatedResponse,
} from '../../repositories/services-repositories/IServicesRepository';

class GetServiceByNameUseCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(name: string, offset: number): Promise<PagenatedResponse> {
        const service = await this.serviceRepository.getServiceByName(name, offset);

        if (!service) throw new Error('Service Not Found');

        return service;
    }
}
export { GetServiceByNameUseCase };
