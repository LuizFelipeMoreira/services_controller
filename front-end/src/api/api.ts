import axios from 'axios';
import { ServicesType } from '../@types/ServicesType';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8181',
});

const handleRequest = async <T>(request: Promise<{ data: T }>): Promise<T> => {
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
