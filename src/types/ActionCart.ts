import { ActionTypeCart } from './ActionTypeCart';
import { Product } from './Product';

export type ActionCart =
  | { type: ActionTypeCart.AddToCart; payload: Product }
  | { type: ActionTypeCart.DeleteFromCart; payload: number }
  | {
    type: ActionTypeCart.ChangeQuantity;
    payload: { id: number, newQuantity: number }
  };
