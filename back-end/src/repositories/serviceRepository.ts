import { Servicos } from '../models/Services';
import { ServiceType } from '../types/ServicesType';


export const create = async (data: ServiceType): Promise<ServiceType> => {
     const newService = await Servicos.create(data);
     return newService.get(); // Retorna os atributos do serviço criado
   };
   
   // Função para atualizar um serviço
   export const update = async (id: number, data: Partial<ServiceType>): Promise<[number]> => {
     return await Servicos.update(data, { where: { id } });
   };
   
   // Função para deletar um serviço
   export const delete = async (id: number): Promise<number> => {
     return await Servicos.destroy({ where: { id } });
   };
   
   // Função para pegar todos os serviços
   export const getAll = async (): Promise<ServiceType[]> => {
     return await Servicos.findAll();
   };