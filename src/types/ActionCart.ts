import { ActionTypeCart } from './ActionTypeCart';
import { Product } from './Product';

export type ActionCart =
  | { type: ActionTypeCart.AddToCart; payload: Product }
  | { type: ActionTypeCart.DeleteFromCart; payload: string };
