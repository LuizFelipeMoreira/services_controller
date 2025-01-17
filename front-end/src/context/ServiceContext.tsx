import React from 'react';
import { IService } from '../@types/IService';
import {
  CREATE_SERVICE,
  DELETE_SERVICE,
  GET_SERVICES,
  UPDATE_SERVICE,
} from '../services/handleRequests';

interface ServiceProvider {
  children: React.ReactNode;
}

interface UseServiceType {
  serviceList: IService[];
  deleteServiceList: (id: number) => void;
  addNewService: (newervice: IService) => Promise<void>;
  updateService: (body: IService) => Promise<void>;
}

export const ServiceContext = React.createContext({} as UseServiceType);

export const ServiceProvider = ({ children }: ServiceProvider) => {
  const [serviceList, setServicesList] = React.useState<IService[]>([]);

  React.useEffect(() => {
    GET_SERVICES(1, 10).then((data) => {
      console.log(data);

      setServicesList(data);
    });
  }, []);

  const addNewService = async (newService: IService) => {
    if (!newService) return;

    setServicesList((oldServices: IService[]) => [...oldServices, newService]);

    await CREATE_SERVICE(newService);
  };

  const deleteServiceList = async (id: number) => {
    await DELETE_SERVICE(id);
    const serviceRemoved = serviceList.filter((service) => service.id !== id);
    setServicesList(serviceRemoved);
  };

  const updateService = async (body: IService) => {
    if (!body.id) return;

    const updatedServices = [...serviceList].map((service) =>
      service.id === body.id ? { ...body } : service
    );
    setServicesList(updatedServices);
    UPDATE_SERVICE(body.id, body);
  };

  return (
    <ServiceContext.Provider
      value={{ serviceList, deleteServiceList, addNewService, updateService }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
