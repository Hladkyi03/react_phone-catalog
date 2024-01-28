import { ActionTypeProducts } from './ActionTypeProducts';
import { Product } from './Product';

export type ActionProducts =
  | { type: ActionTypeProducts.GetProducts; payload: Product[] };
