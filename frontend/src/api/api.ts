import axios, { AxiosResponse } from 'axios';
import { Image } from '../interfaces';
axios.defaults.baseURL = 'http://localhost:3001';

export const getAllImages = async (): Promise<Image[]> => {
  const res: AxiosResponse = await axios({
    method: 'get',
    url: '/images',
  });
  const resData = res.data as Image[];
  return resData;
};
