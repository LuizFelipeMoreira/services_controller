import { CreateServiceDTO, ServiceResponseDTO } from '../dtos/service.dto';

export interface ServiceRepositoryInterface {
    create(data: CreateServiceDTO): Promise<ServiceResponseDTO>;
    update(id: number, data: CreateServiceDTO): Promise<void>;
    getAll(): Promise<ServiceResponseDTO[]>;
    deleteService(id: number): Promise<void>;
    getServiceByName(nome: string, offset: number): Promise<PaginatedResponse | null>;
    getServiceById(id: number): Promise<ServiceResponseDTO | null>;
    getServicesPaginated(limit: number, offset: number): Promise<PaginatedResponse>;
    releaseServiceById(id: number): Promise<void>;
}

export interface PaginatedResponse {
    count: number;
    rows: ServiceResponseDTO[];
}
