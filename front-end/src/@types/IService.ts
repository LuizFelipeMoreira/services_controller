export interface IService {
  id: number;
  nome: string;
  lente: string;
  laboratorio: string;
  os: string;
  situacao: 'pendente' | 'entregue';
  created_at: string;
  updated_at: string;
  dataIda: string;
  dataEntrega: string;
}

export type IServiceResquest = Omit<
  IService,
  'id' | 'created_at' | 'updated_at'
>;

export interface IServicesPaginated {
  count: number;
  rows: IService[];
}
