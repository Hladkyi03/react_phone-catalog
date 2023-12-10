import { ActionType } from './ActionType';
import { Product } from './Product';

export type Action =
  | { type: ActionType.GetProducts; payload: Product[] };
