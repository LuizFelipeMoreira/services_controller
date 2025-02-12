import {
    IServiceRepository,
    PagenatedResponse,
} from '../../repositories/services-repositories/IServicesRepository';

class GetServiceByNameUseCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(name: string, page: number): Promise<PagenatedResponse> {
        const offset = page > 0 ? (page - 1) * 10 : page;
        const service = await this.serviceRepository.getServiceByName(name, offset);

        if (!service) throw new Error('Nao ha servicos com esse nome');

        return service;
    }
}
export { GetServiceByNameUseCase };
