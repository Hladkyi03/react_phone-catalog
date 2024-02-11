import { CartItem } from '../types/CartItem';

export const getItemId = (arrayOfItems: CartItem[]) => {
  if (arrayOfItems.length === 0) {
    return 1;
  }

  const maximalId = arrayOfItems.reduce((maxId, currentItem) => {
    return currentItem.id > maxId ? currentItem.id : maxId;
  }, arrayOfItems[0].id);

  return (maximalId + 1);
};
