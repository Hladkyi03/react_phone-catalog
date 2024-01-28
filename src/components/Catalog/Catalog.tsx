import './Catalog.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../ProductsList/ProductsList';

type Props = {
  products: Product[],
};

export const Catalog: React.FC<Props> = ({ products }) => {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const perPage = searchParams.get('perPage') === 'all'
    ? products.length
    : (Number(searchParams.get('perPage')) || 16);

  const sort = searchParams.get('sort') || 'age';

  let visibleProducts;

  switch (sort) {
    case 'age':
      visibleProducts = products.sort((product1, product2) => {
        return product2.year - product1.year;
      });
      break;

    case 'price':
      visibleProducts = products.sort((product1, product2) => {
        return product1.price - product2.price;
      });
      break;

    case 'name':
      visibleProducts = products.sort((product1, product2) => {
        return product1.name.localeCompare(product2.name);
      });
      break;

    default:
      visibleProducts = products.sort((product1, product2) => {
        return product1.year - product2.year;
      });
      break;
  }

  return (
    <div className="catalog">
      <div className="container">
        <ProductsList
          products={visibleProducts}
          total={products.length}
          currentPage={page}
          perPage={perPage}
        />
      </div>
    </div>
  );
};
