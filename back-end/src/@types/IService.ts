export interface CreateServiceDTO {
    nome: string;
    lente: string;
    laboratorio: string;
    os: string;
    dataIda: string;
    dataVolta: string;
}

export interface ServiceResponseDTO {
    id: number;
    nome: string;
    lente: string;
    laboratorio: string;
    os: string;
    dataIda: string;
    dataVolta: string;
    createdAt: string;
    updatedAt: string;
}
