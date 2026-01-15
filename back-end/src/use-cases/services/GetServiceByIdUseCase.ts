import { ServiceResponseDTO } from '../../@types/IService';
import { IServiceRepository } from '../../repositories/services-repositories/IServicesRepository';

class GetServiceByIdUseCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(id: number): Promise<ServiceResponseDTO> {
        const service = await this.serviceRepository.getServiceByID(id);

        if (!service) throw new Error('Service Not Found');

        return service;
    }
}
export { GetServiceByIdUseCase };
