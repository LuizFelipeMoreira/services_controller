import {
  IService,
  IServiceResquest,
  IServicesPaginated,
} from '../@types/IService';
import { IUserPayLoad, IUserResponse } from '../@types/IUser';
import { axiosInstance } from '../lib/api';

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    const { data } = await request;

    return data;
  } catch (error) {
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

export const RELEASE_SERVICE = (id: number) => {
  console.log(
    'Entrou na funcao de liberar servico da api, agora o servico de id ' +
      id +
      ' foi liberado'
  );

  return handleRequest(axiosInstance.post(`/release/${id}`));
};

export const LOGIN_USER = (
  email: string,
  password: string
): Promise<IUserResponse> =>
  handleRequest(axiosInstance.post('/signin', { email, password }));

export const GET_ME = (): Promise<IUserPayLoad> =>
  handleRequest(axiosInstance.get('/me'));
