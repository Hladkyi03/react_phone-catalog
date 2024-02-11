import { CartItem } from '../types/CartItem';

export const countTotalSum = (array: CartItem[]) => {
  // eslint-disable-next-line max-len
  return array.reduce((totalSum, currentItem) => totalSum + (currentItem.quantity * currentItem.product.price), 0);
};
