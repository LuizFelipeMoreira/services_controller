import { IService } from '../../@types/IService';
import { Servicos } from '../../database/model/Services';
import {
    IServiceRepository,
    PagenatedResponse,
} from '../services-repositories/IServicesRepository';

class ServiceRepository implements IServiceRepository {
    async create(data: IService): Promise<IService> {
        const newService = await Servicos.create({ ...data });
        return newService.toJSON();
    }

    async update(id: number, data: IService): Promise<void> {
        await Servicos.update(data, { where: { id } });
    }

    async deleteService(id: number): Promise<void> {
        await Servicos.destroy({ where: { id } });
    }

    async getAll(): Promise<IService[]> {
        const allServices = await Servicos.findAll();
        return allServices.map((service) => service.toJSON());
    }

    async getServiceByID(id: number): Promise<IService | null> {
        const service = await Servicos.findByPk(id);
        return service ? service.toJSON() : null;
    }

    //limit: Define o número de registros a serem retornados.
    //offset: Define a posição inicial para buscar os registros (usado para paginação).

    async getServicesPagenated(
        limit: number,
        offset: number
    ): Promise<PagenatedResponse> {
        const { count, rows } = await Servicos.findAndCountAll({
            offset,
            limit,
        });

        return { count, rows: rows.map((item) => item.toJSON() as IService) };
    }
}

export default new ServiceRepository();
