import { Product } from '../types/Product';

export const getSuggestedProducts = (
  array: Product[],
  indexToExclude: number,
) => {
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }

  if (array.length <= 10) {
    return array;
  }

  const randomIndexes: number[] = [];

  while (randomIndexes.length < 10) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (
      !randomIndexes.includes(randomIndex)
      && randomIndex !== indexToExclude
    ) {
      randomIndexes.push(randomIndex);
    }
  }

  const randomElements = randomIndexes.map((index) => array[index]);

  return randomElements;
};
