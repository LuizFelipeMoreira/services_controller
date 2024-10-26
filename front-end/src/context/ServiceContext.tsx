import React from 'react';
import { ServicesType } from '../@types/ServicesType';
import {
  CREATE_SERVICE,
  DELETE_SERVICE,
  GET_SERVICES,
} from '../services/handleRequests';

interface ServiceProvider {
  children: React.ReactNode;
}

interface UseServiceType {
  serviceList: ServicesType[];
  deleteServiceList: (id: number) => void;
  addNewService: (newervice: ServicesType) => Promise<void>;
  updateService: (id: number, body: ServicesType) => Promise<void>;
}

export const ServiceContext = React.createContext<UseServiceType | null>(null);

export const ServiceProvider = ({ children }: ServiceProvider) => {
  const [serviceList, setServicesList] = React.useState<ServicesType[]>([]);

  React.useEffect(() => {
    GET_SERVICES().then((data) => {
      setServicesList(data);
      console.log(serviceList);
    });
  }, []);

  const addNewService = async (newService: ServicesType) => {
    if (!newService) return;

    setServicesList((oldServices: ServicesType[]) => [
      ...oldServices,
      newService,
    ]);

    await CREATE_SERVICE(newService);
  };

  const deleteServiceList = async (id: number) => {
    await DELETE_SERVICE(id);
    const serviceRemoved = serviceList.filter((service) => service.id !== id);
    setServicesList(serviceRemoved);
  };

  const updateService = async (id: number, body: ServicesType) => {
    const indexService = serviceList.findIndex((service) => service.id == id);

    serviceList[indexService].nome = body.nome;
    serviceList[indexService].lente = body.lente;
    serviceList[indexService].laboratorio = body.laboratorio;
    serviceList[indexService].os = body.os;

    console.log(serviceList[indexService]);
  };

  return (
    <ServiceContext.Provider
      value={{ serviceList, deleteServiceList, addNewService, updateService }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
