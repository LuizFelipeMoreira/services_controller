import { IService } from '../../@types/IService';
import { IServiceRepository } from '../../repositories/services-repositories/IServicesRepository';

class CreateServiceUserCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(data: IService): Promise<IService> {
        const newService = await this.serviceRepository.create(data);

        return newService;
    }
}

export { CreateServiceUserCase };
