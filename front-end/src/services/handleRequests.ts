/* eslint-disable @typescript-eslint/no-unused-vars */
import { ServicesType } from '../@types/ServicesType';
import { axiosInstance } from '../lib/api';

export const handleRequest = async <T>(
  request: Promise<{ data: T }>
): Promise<T> => {
  try {
    const { data } = await request;

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const GET_SERVICES = async (): Promise<ServicesType[]> => {
  try {
    const { data } = await axiosInstance.get('/services');

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const CREATE_SERVICE = async (
  formData: ServicesType
): Promise<ServicesType> => {
  try {
    const { data } = await axiosInstance.post('/create', formData);

    return data;
  } catch (error) {
    console.log('ERRO AO CRIAR SERVICO:' + error);
    return Promise.reject(error);
  }
};

export const DELETE_SERVICE = async (id: number): Promise<void> => {
  const serviceDeleted = await axiosInstance.post(`delete/${id}`);

  return;
};

export const UPDATE_SERVICE = async (
  id: number,
  body: ServicesType
): Promise<void> => {
  const serviceUpdated = await axiosInstance.post(`edit/${id}`, body);

  return;
};
