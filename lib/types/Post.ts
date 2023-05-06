export type PostType = {
  id: string;
  createdAt: string;
  date: string;
  expiryDate: string;
  period: any;
  product: string;
  store: string;
  type: string;
  picture?: any;
  user?: {
    id: string;
    name: string;
    image: string;
  };
};
