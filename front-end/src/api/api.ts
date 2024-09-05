import axios from 'axios';
import { ServicesType } from '../types/ServicesType';

export const api = axios.create({
  baseURL: 'http://localhost:8181',
});

export const GET_SERVICES = async (): Promise<ServicesType[]> => {
  try {
    const { data } = await axios.get('http://localhost:8181/services');

    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const POST_SERVICE = async (data: ServicesType) => {
  try {
    const response = await axios.post('http://localhost:8181/create', data);

    return response.data as ServicesType;
  } catch (error) {
    console.log(error);
  }
};
