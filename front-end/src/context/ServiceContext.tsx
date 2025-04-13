import React from 'react';
import { IService, IServiceResquest } from '../@types/IService';
import {
  CREATE_SERVICE,
  DELETE_SERVICE,
  GET_SERVICES,
  GET_SERVICES_BY_NAME,
  UPDATE_SERVICE,
  RELEASE_SERVICE,
} from '../api/handleRequests';

interface ServiceProvider {
  children: React.ReactNode;
}

interface IServiceContext {
  serviceList: IService[];
  totalServices: number;
  deleteService: (id: number) => void;
  addNewService: (newervice: IServiceResquest) => Promise<void>;
  updateService: (body: IService) => Promise<void>;
  getServicesPaginated: (page: number, size: number) => Promise<void>;
  getServicesByName: (name: string, offset: number) => Promise<void>;
  releaseServiceById: (id: number) => Promise<void>;
}

export const ServiceContext = React.createContext({} as IServiceContext);

export const ServiceProvider = ({ children }: ServiceProvider) => {
  const [serviceList, setServiceList] = React.useState<IService[]>([]);
  const [totalServices, seTotalServices] = React.useState(0);

  React.useEffect(() => {
    async function fethcServices() {
      const { count, rows } = await GET_SERVICES(1, 10);

      seTotalServices(count);
      setServiceList(rows);
    }

    fethcServices();
  }, []);

  const getServicesPaginated = async (page: number, size: number) => {
    const { rows, count } = await GET_SERVICES(page, size);

    seTotalServices(count);
    setServiceList(rows);
  };

  const getServicesByName = async (name: string, offset = 0) => {
    const { count, rows } = await GET_SERVICES_BY_NAME(name, offset);

    setServiceList(rows);
    seTotalServices(count);
  };

  const addNewService = async (serviceFormData: IServiceResquest) => {
    if (!serviceFormData) return;

    const newService = await CREATE_SERVICE(serviceFormData);

    setServiceList((oldServices: IService[]) => [newService, ...oldServices]);
    getServicesPaginated(1, 10);
  };

  const deleteService = async (id: number) => {
    await DELETE_SERVICE(id);
    const serviceRemoved = serviceList.filter((service) => service.id !== id);
    setServiceList(serviceRemoved);
    seTotalServices((prevTotal) => prevTotal - 1);
  };

  const updateService = async (body: IService) => {
    if (!body.id) return;

    const updatedServices = [...serviceList].map((service) =>
      service.id === body.id ? { ...body } : service
    );
    setServiceList(updatedServices);
    UPDATE_SERVICE(body.id, body);
  };

  const releaseServiceById = async (id: number) => {
    RELEASE_SERVICE(id);
  };

  return (
    <ServiceContext.Provider
      value={{
        serviceList,
        totalServices,
        deleteService,
        addNewService,
        updateService,
        getServicesPaginated,
        getServicesByName,
        releaseServiceById,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};
