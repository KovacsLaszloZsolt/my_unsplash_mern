export type ImageType = {
  label: string;
  url: string;
  reviewUrl: string;
  isProtected: boolean;
  _id: string;
};

export type InputFileValues = {
  label: string;
  password: string;
  name: string;
  base64encodedImage: string | ArrayBuffer | null;
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
  uploadImage: (formData: FormData) => Promise<void>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};
