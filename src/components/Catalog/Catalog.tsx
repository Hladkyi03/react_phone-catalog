import './Catalog.scss';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../types/Product';
import { ProductsList } from '../ProductsList/ProductsList';
import { Filters } from '../Filters/Filters';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';

type Props = {
  title: string,
  modelsCount: number,
  products: Product[],
};

const breadCrumbsItems = [{ name: 'Phones', slug: 'phones' }];

export const Catalog: React.FC<Props> = ({ title, modelsCount, products }) => {
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
        <BreadCrumbs breadCrumbsItems={breadCrumbsItems} />

        <h1 className="catalog__title">
          {title}
        </h1>

        <p className="catalog__models-count">
          {`${modelsCount} models`}
        </p>

        <Filters />

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
