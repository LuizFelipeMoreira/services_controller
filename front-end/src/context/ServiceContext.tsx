import React from 'react';
import { IService, IServiceResquest } from '../@types/IService';
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
  setServiceList: (data: IService[]) => void;
  deleteService: (id: number) => void;
  addNewService: (newervice: IServiceResquest) => Promise<void>;
  updateService: (body: IService) => Promise<void>;
  getServicesPaginated: (page: number, size: number) => Promise<void>;
}

export const ServiceContext = React.createContext({} as UseServiceType);

export const ServiceProvider = ({ children }: ServiceProvider) => {
  const [serviceList, setServiceList] = React.useState<IService[]>([]);

  React.useEffect(() => {
    GET_SERVICES(1, 10).then((data) => {
      console.log(data);

      setServiceList(data.rows);
    });
  }, []);

  const getServicesPaginated = async (page: number, size: number) => {
    const { rows } = await GET_SERVICES(page, size);

    setServiceList(rows);
  };

  const addNewService = async (serviceFormData: IServiceResquest) => {
    if (!serviceFormData) return;

    const newService = await CREATE_SERVICE(serviceFormData);

    setServiceList((oldServices: IService[]) => [...oldServices, newService]);
  };

  const deleteService = async (id: number) => {
    await DELETE_SERVICE(id);
    const serviceRemoved = serviceList.filter((service) => service.id !== id);
    setServiceList(serviceRemoved);
  };

  const updateService = async (body: IService) => {
    if (!body.id) return;

    const updatedServices = [...serviceList].map((service) =>
      service.id === body.id ? { ...body } : service
    );
    setServiceList(updatedServices);
    UPDATE_SERVICE(body.id, body);
  };

  return (
    <ServiceContext.Provider
      value={{
        serviceList,
        setServiceList,
        deleteService,
        addNewService,
        updateService,
        getServicesPaginated,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
