import { createContext, useState } from 'react';
import axios, { AxiosResponse } from 'axios';

import { AppContextType, ImageType, LayoutProps } from '../interfaces';
axios.defaults.baseURL = 'http://localhost:3001';
// axios.defaults.baseURL = 'https://morning-garden-14259.herokuapp.com/';

const AppContext = createContext<AppContextType>({} as AppContextType);

export const AppContextProvider = ({ children }: LayoutProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [data, setData] = useState<ImageType[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const getAllImages = async (skip: number): Promise<void> => {
    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url: `/images?label=${searchValue}&skip=${skip}`,
      });
      const resData = res.data as ImageType[];
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
      value={{
        isModalOpen,
        setIsModalOpen,
        data,
        setData,
        getAllImages,
        uploadImage,
        isFetching,
        setIsFetching,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
