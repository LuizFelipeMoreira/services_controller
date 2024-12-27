import { IService } from '../../@types/IService';
import { IServiceRepository } from '../../repositories/services-repositories/IServicesRepository';

class GetAllServiceUserCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(): Promise<IService[]> {
        const services = await this.serviceRepository.getAll();

        return services;
    }
}

export { GetAllServiceUserCase };
