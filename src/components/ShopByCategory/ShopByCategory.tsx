import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProductsContext } from '../ProductsContext/ProductsContext';
import './ShopByCategory.scss';

export const ShopByCategory = () => {
  const state = useContext(ProductsContext);

  const phonesAmount = state.products.filter(
    (product) => product.category === 'phones',
  ).length;

  const tabletsAmount = state.products.filter(
    (product) => product.category === 'tablet',
  ).length;

  const accesoriesAmount = state.products.filter(
    (product) => product.category === 'accesorie',
  ).length;

  return (
    <div className="shop-by-caterogy shop-by-caterogy--margin-top-80">
      <div className="container">
        <h3 className="shop-by-caterogy__title">Shop by category</h3>

        <div className="shop-by-caterogy__category">
          <Link to="/phones" className="shop-by-caterogy__link">
            <div
              className="shop-by-caterogy__category-image
            shop-by-caterogy__category-image--phones"
            />

            <p className="shop-by-caterogy__caterogy-name">Mobile phones</p>

            <p className="shop-by-caterogy__models-amount">
              {phonesAmount}
              {' '}
              models
            </p>
          </Link>
        </div>

        <div className="shop-by-caterogy__category shop-by-caterogy__category">
          <Link to="/tablets" className="shop-by-caterogy__link">
            <div
              className="shop-by-caterogy__category-image
            shop-by-caterogy__category-image--tablets"
            />

            <p className="shop-by-caterogy__caterogy-name">Tablets</p>

            <p className="shop-by-caterogy__models-amount">
              {tabletsAmount}
              {' '}
              models
            </p>
          </Link>
        </div>

        <div className="shop-by-caterogy__category shop-by-caterogy__category">
          <Link to="/accessories" className="shop-by-caterogy__link">
            <div
              className="shop-by-caterogy__category-image
            shop-by-caterogy__category-image--accessories"
            />

            <p className="shop-by-caterogy__caterogy-name">Accessories</p>

            <p className="shop-by-caterogy__models-amount">
              {accesoriesAmount}
              {' '}
              models
            </p>
          </Link>
          s
        </div>
      </div>
    </div>
  );
};
