import { Product } from './Product';

export type CartItem = {
  product: Product,
  id: number,
  quantity: number,
};
