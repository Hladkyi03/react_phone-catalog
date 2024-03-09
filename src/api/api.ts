import { Product } from '../types/Product';
import { ProductDetails } from '../types/ProductDetails';

// eslint-disable-next-line max-len
const API_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products.json';

// eslint-disable-next-line max-len
const API_DETAILS_URL = 'https://mate-academy.github.io/react_phone-catalog/_new/products/';

export async function getProducts(): Promise<Product[]> {
  return fetch(API_URL)
    .then(response => response.json());
}

export async function getProductDetails(id: string): Promise<ProductDetails> {
  return fetch(`${API_DETAILS_URL}${id}.json`)
    .then(response => response.json());
}
