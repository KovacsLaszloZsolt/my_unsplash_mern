import { createContext, useState, useLayoutEffect } from 'react';
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
  // const [isFirstFetching, setIsFirstFetching] = useState<boolean>(true);

  const getAllImages = async (skip: number): Promise<void> => {
    try {
      const res: AxiosResponse = await axios({
        method: 'get',
        url: `/images?label=${searchValue}&skip=${skip}`,
      });
      const resData = res.data as ImageType[];

      // setLastFetchedDataLength(resData.length);

      if (skip) {
        setData([...data, ...resData]);
      } else {
        setData(resData);
      }

      setIsFetching(false);
      // setIsFirstFetching(false);
    } catch (err) {
      console.log(err);
    }
  };

  const uploadImages = async (formData: FormData): Promise<void> => {
    console.log(formData);
    try {
      const res = await axios({
        method: 'post',
        url: '/images',
        data: formData,
      });
      console.log(res);
      if (res.status === 201) {
        await getAllImages(0);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // useLayoutEffect(() => {
  //   if (lastFetchedDataLength && !isFirstFetching && document.documentElement.offsetHeight <= window.innerHeight) {
  //     console.log('run');
  //     setIsFirstFetching(true);
  //     void getAllImages(data.length);
  //   }
  // }, [isFirstFetching]);

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        data,
        setData,
        getAllImages,
        uploadImages,
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
