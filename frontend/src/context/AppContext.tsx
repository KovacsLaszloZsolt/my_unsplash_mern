import React, { createContext, useState } from 'react';
import { Image } from '../interfaces';
import axios, { AxiosResponse } from 'axios';
axios.defaults.baseURL = 'http://localhost:3001';

export interface LayoutProps {
  children: React.ReactNode;
}

export type AppContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: Image[];
  setData: React.Dispatch<React.SetStateAction<Image[]>>;
  getAllImages: (skip: number) => Promise<void>;
  uploadImage: (formData: FormData) => Promise<void>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppContextProvider = ({ children }: LayoutProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<Image[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getAllImages = async (skip: number): Promise<void> => {
    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url: `/images?skip=${skip}`,
      });
      const resData = res.data as Image[];
      console.log(resData);
      if (skip) {
        setData([...data, ...resData]);
      } else {
        setData(resData);
      }
      setIsFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImage = async (formData: FormData): Promise<void> => {
    try {
      const res = await axios({
        method: 'post',
        url: '/images',
        data: formData,
      });
      console.log(res);
      if (res.status === 201) {
        void getAllImages(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppContext.Provider
      value={{ isModalOpen, setIsModalOpen, data, setData, getAllImages, uploadImage, isFetching, setIsFetching }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
