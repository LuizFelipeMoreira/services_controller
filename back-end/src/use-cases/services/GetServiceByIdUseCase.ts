import { ServiceType } from '../../@types/ServicesType';
import { IServiceRepository } from '../../repositories/IServicesRepository';

class GetServiceByIdUseCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(id: number): Promise<ServiceType> {
        const service = await this.serviceRepository.getServiceByID(id);

        if (!service) throw new Error('Service Not Found');

        return service;
    }
}
export { GetServiceByIdUseCase };
