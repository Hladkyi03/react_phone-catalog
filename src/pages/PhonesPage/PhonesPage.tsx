import { useEffect, useState } from 'react';
// import { Product } from "../../types/Product";
import { getProducts } from '../../api/api';
import { Catalog } from '../../components/Catalog/Catalog';
import { Product } from '../../types/Product';
import { Loader } from '../../components/Loader/Loader';

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
      {isLoading
        ? (<Loader />)
        : (
          <Catalog
            title="Mobile phones"
            modelsCount={phones.length}
            products={phones}
          />
        )}
    </>
  );
};
