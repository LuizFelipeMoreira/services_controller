import { Op } from 'sequelize';
import { ServiceModel } from '../../../database/model/service.model';
import { CreateServiceDTO, ServiceResponseDTO } from '../dtos/service.dto';
import {
    PaginatedResponse,
    ServiceRepositoryInterface,
} from './service.repository.interface';

class ServiceRepository implements ServiceRepositoryInterface {
    async create(data: CreateServiceDTO): Promise<ServiceResponseDTO> {
        const newService = await ServiceModel.create({ ...data });
        return newService.toJSON();
    }

    async update(id: number, data: CreateServiceDTO): Promise<void> {
        await ServiceModel.update(data, { where: { id } });
    }

    async deleteService(id: number): Promise<void> {
        await ServiceModel.destroy({ where: { id } });
    }

    async getAll(): Promise<ServiceResponseDTO[]> {
        const allServices = await ServiceModel.findAll();
        return allServices.map((service) => service.toJSON());
    }

    async getServiceByName(
        nome: string,
        offset: number
    ): Promise<PaginatedResponse | null> {
        const { count, rows } = await ServiceModel.findAndCountAll({
            offset,
            limit: 10,
            where: nome ? { nome: { [Op.like]: `%${nome}%` } } : undefined,
            order: [['id', 'DESC']],
        });

        return { count, rows: rows.map((item) => item.toJSON() as ServiceResponseDTO) };
    }

    async releaseServiceById(id: number): Promise<void> {
        await ServiceModel.update({ situacao: 'entregue' }, { where: { id } });
    }

    async getServiceById(id: number): Promise<ServiceResponseDTO | null> {
        const service = await ServiceModel.findByPk(id);
        return service ? service.toJSON() : null;
    }

    async getServicesPaginated(
        limit: number,
        offset: number
    ): Promise<PaginatedResponse> {
        const { count, rows } = await ServiceModel.findAndCountAll({
            offset,
            limit,
            order: [['id', 'DESC']],
        });

        return { count, rows: rows.map((item) => item.toJSON() as ServiceResponseDTO) };
    }
}

export default new ServiceRepository();
