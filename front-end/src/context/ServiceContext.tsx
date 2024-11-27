import React from 'react';
import { ServicesType } from '../@types/ServicesType';
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
  serviceList: ServicesType[];
  deleteServiceList: (id: number) => void;
  addNewService: (newervice: ServicesType) => Promise<void>;
  updateService: (body: ServicesType) => Promise<void>;
}

export const ServiceContext = React.createContext({} as UseServiceType);

export const ServiceProvider = ({ children }: ServiceProvider) => {
  const [serviceList, setServicesList] = React.useState<ServicesType[]>([]);

  React.useEffect(() => {
    GET_SERVICES().then((data) => {
      setServicesList(data);
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

  const updateService = async (body: ServicesType) => {
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
