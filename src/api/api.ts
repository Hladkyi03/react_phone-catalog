import { Product } from '../types/Product';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

export async function getProducts(): Promise<Product[]> {
  return fetch(API_URL)
    .then(response => response.json());
}
