export type ImageType = {
  label: string;
  url: string;
  reviewUrl: string;
  isProtected: boolean;
  _id: string;
};

export interface LayoutProps {
  children: React.ReactNode;
}

export type AppContextType = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: ImageType[];
  setData: React.Dispatch<React.SetStateAction<ImageType[]>>;
  getAllImages: (skip: number) => Promise<void>;
  uploadImages: (formData: FormData) => Promise<void>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
