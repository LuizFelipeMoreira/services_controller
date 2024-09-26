import { ServiceType } from '../@types/ServicesType';

export interface IServiceRepository {
  create(data: ServiceType): Promise<ServiceType>;
  update(id: number, data: ServiceType): Promise<void>;
  getAll(): Promise<ServiceType[]>;
  deleteService(id: number): Promise<void>;
  getServiceByID(id: number): Promise<ServiceType | null>;
}
