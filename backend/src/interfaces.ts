export type ImageType = ResImage & {
  password?: string;
};

export type ResImage = {
  label: string;
  url: string;
  reviewUrl: string;
  isProtected: boolean;
  _id: string;
};
