import { Op } from 'sequelize';
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

    async getServiceByName(
        nome: string,
        offset: number
    ): Promise<PagenatedResponse | null> {
        const { count, rows } = await Servicos.findAndCountAll({
            offset,
            limit: 10,
            where: nome ? { nome: { [Op.like]: `%${nome}%` } } : undefined,
            order: [['id', 'DESC']],
        });

        return { count, rows: rows.map((item) => item.toJSON() as IService) };
    }

    async releaseServiceById(id: number): Promise<void> {
        await Servicos.update({ situacao: 'entregue' }, { where: { id } });
    }

    async getServiceByID(id: number): Promise<IService | null> {
        const service = await Servicos.findByPk(id);
        return service ? service.toJSON() : null;
    }

    async getServicesPagenated(
        limit: number,
        offset: number
    ): Promise<PagenatedResponse> {
        const { count, rows } = await Servicos.findAndCountAll({
            offset,
            limit,
            order: [['id', 'DESC']],
        });

        return { count, rows: rows.map((item) => item.toJSON() as IService) };
    }
}

export default new ServiceRepository();
