import { ActionTypeFavourites } from './ActionTypeFavourites';
import { Product } from './Product';

export type ActionFavourites =
  | { type: ActionTypeFavourites.AddFavourites; payload: Product }
  | { type: ActionTypeFavourites.DeleteFavourites; payload: string };
