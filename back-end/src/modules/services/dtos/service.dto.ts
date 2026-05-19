export interface CreateServiceDTO {
    nome: string;
    lente: string;
    laboratorio: string;
    os: string;
    dataIda: string;
    dataEntrega: string;
}

export interface ServiceResponseDTO {
    id: number;
    nome: string;
    lente: string;
    laboratorio: string;
    os: string;
    dataIda: string;
    dataEntrega: string;
    createdAt: string;
    updatedAt: string;
}
