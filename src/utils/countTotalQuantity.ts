import { CartItem } from '../types/CartItem';

export const countTotalQuantity = (array: CartItem[]) => {
  // eslint-disable-next-line max-len
  return array.reduce((totalQuantity, currentItem) => totalQuantity + currentItem.quantity,
    0);
};
