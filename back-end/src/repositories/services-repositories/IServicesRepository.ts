import { IService } from '../../@types/IService';

export interface IServiceRepository {
    create(data: IService): Promise<IService>;
    update(id: number, data: IService): Promise<void>;
    getAll(): Promise<IService[]>;
    deleteService(id: number): Promise<void>;
    getServiceByID(id: number): Promise<IService | null>;
    getServicesPagenated(limit: number, offset: number): Promise<PagenatedResponse>;
}

export interface PagenatedResponse {
    count: number;
    rows: IService[];
}
