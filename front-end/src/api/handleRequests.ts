import {
  IService,
  IServiceResquest,
  IServicesPaginated,
} from '../@types/IService';
import { axiosInstance } from '../lib/api';

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
};

export const GET_SERVICES = (
  offset: number,
  limit: number
): Promise<IServicesPaginated> =>
  handleRequest(axiosInstance.get(`/services`, { params: { limit, offset } }));

export const GET_SERVICES_BY_NAME = (
  name: string,
  offset: number
): Promise<IServicesPaginated> =>
  handleRequest(
    axiosInstance.get(`/service/search`, { params: { name, offset } })
  );

export const CREATE_SERVICE = (formData: IServiceResquest): Promise<IService> =>
  handleRequest(axiosInstance.post(`/create`, formData));

export const DELETE_SERVICE = (id: number): Promise<void> =>
  handleRequest(axiosInstance.post(`/delete/${id}`));

export const UPDATE_SERVICE = (id: number, body: IService): Promise<void> =>
  handleRequest(axiosInstance.post(`/edit/${id}`, body));
