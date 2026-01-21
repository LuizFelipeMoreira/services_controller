import { CreateServiceDTO, ServiceResponseDTO } from '../../@types/IService';

export interface IServiceRepository {
    create(data: CreateServiceDTO): Promise<ServiceResponseDTO>;
    update(id: number, data: CreateServiceDTO): Promise<void>;
    getAll(): Promise<ServiceResponseDTO[]>;
    deleteService(id: number): Promise<void>;
    getServiceByName(nome: string, offset: number): Promise<PagenatedResponse | null>;
    getServiceByID(id: number): Promise<ServiceResponseDTO | null>;
    getServicesPagenated(limit: number, offset: number): Promise<PagenatedResponse>;
    releaseServiceById(id: number): Promise<void>;
}

export interface PagenatedResponse {
    count: number;
    rows: ServiceResponseDTO[];
}
