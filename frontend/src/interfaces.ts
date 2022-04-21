export type Image = {
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
  data: Image[];
  setData: React.Dispatch<React.SetStateAction<Image[]>>;
  getAllImages: (skip: number) => Promise<void>;
  uploadImage: (formData: FormData) => Promise<void>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
