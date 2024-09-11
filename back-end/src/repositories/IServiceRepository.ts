import { ServiceType } from '../types/ServicesType';

export interface IServiceRepository {
  create(data: ServiceType): Promise<ServiceType>;
  update(id: number, data: ServiceType): Promise<ServiceType>;
  getAll(): Promise<ServiceType[]>;
  deleteService(id: number): void;
}
