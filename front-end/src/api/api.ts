import axios from 'axios';
import { ServicesType } from '../types/ServicesType';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8181',
});

export const GET_SERVICES = async (): Promise<ServicesType[]> => {
  try {
    const { data } = await axiosInstance.get('/services');

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const POST_SERVICE = async (data: ServicesType) => {
  try {
    const response = await axiosInstance.post('/create', data);

    return response.data as ServicesType;
  } catch (error) {
    console.log(error);
  }
};
