import { IServiceRepository } from '../../repositories/services-repositories/IServicesRepository';

class ReleaseServiceUseCase {
    constructor(private serviceRepository: IServiceRepository) {}

    async execute(id: number, situation: string) {
        await this.serviceRepository.releaseServiceById(id, situation);
    }
}

export { ReleaseServiceUseCase };
