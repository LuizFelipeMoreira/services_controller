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

  return (
    <ServiceContext.Provider
      value={{ serviceList, deleteServiceList, addNewService }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
