import { CreateServiceDTO } from '../../@types/IService';
import { IServiceRepository } from '../../repositories/services-repositories/IServicesRepository';
import { GetServiceByIdUseCase } from './GetServiceByIdUseCase';

class UpdateServiceUserCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(id: number, data: CreateServiceDTO): Promise<void> {
        const getServiceByID = new GetServiceByIdUseCase(this.serviceRepository);
        const existingService = await getServiceByID.execute(id);

        if (!existingService) throw new Error('Service not Found');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatedService = await this.serviceRepository.update(id, data);
    }
}

export { UpdateServiceUserCase };
