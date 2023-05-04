export type PostType = {
  id: string;
  createdAt: Date;
  date: Date;
  expiryDate: Date;
  period: number;
  product: string;
  store: string;
  type: string;
  picture: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
};
