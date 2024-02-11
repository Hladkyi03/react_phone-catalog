import { useEffect, useState } from 'react';
// import { Product } from "../../types/Product";
import { getProducts } from '../api/api';
import { Catalog } from '../components/Catalog/Catalog';
import { Product } from '../types/Product';
import { Loader } from '../components/Loader/Loader';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { Filters } from '../components/Filters/Filters';

const breadCrumbsItems = [{ name: 'Phones', slug: 'Phones' }];

export const PhonesPage = () => {
  const [phones, setPhones] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPhonesOnly = (products: Product[]) => {
    return products
      .filter(product => (
        product.category === 'phones'
      ));
  };

  useEffect(() => {
    setIsLoading(true);

    getProducts()
      .then(response => {
        setPhones(getPhonesOnly(response));
      })
      .catch(() => {
        throw new Error();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container">
        <BreadCrumbs breadCrumbsItems={breadCrumbsItems} />

        <h1 className="catalog__title">
          Mobile phones
        </h1>

        <p className="catalog__models-count">
          {`${phones.length} models`}
        </p>

        <Filters />
      </div>

      {isLoading
        ? (<Loader />)
        : (
          <Catalog
            products={phones}
          />
        )}
    </>
  );
};
