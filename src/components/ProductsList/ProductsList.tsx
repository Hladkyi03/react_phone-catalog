import './ProductsList.scss';
import cn from 'classnames';
import { Link, useSearchParams } from 'react-router-dom';
import { useContext } from 'react';
import { Product } from '../../types/Product';
import { getNumbers } from '../../utils/getNumbers';
import { getSearchWith } from '../../utils/getSearchWith';
import { ProductCard } from '../ProductCard/ProductCard';
import { FavouritesContext } from '../FavouriteContext/FavouriteContext';
import { CartProductsContext } from '../CartContext/CartContext';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  products: Product[],
};

export const ProductsList: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  products,
}) => {
  const [searchParams] = useSearchParams();
  const favouritesState = useContext(FavouritesContext);
  const CartState = useContext(CartProductsContext);

  const buttonCount = total % perPage === 0
    ? Math.floor(total / perPage)
    : Math.floor((total / perPage) + 1);

  const pageNumbers = getNumbers(1, buttonCount);

  const visibleItems = products
    .slice(currentPage * perPage - perPage, currentPage * perPage);

  const checkInFavourities = (id: string) => {
    return favouritesState.favourites.some(item => (
      item.id === id
    ));
  };

  const checkInCart = (id: string) => {
    return CartState.cartItems.some(item => (
      item.product.id === id
    ));
  };

  const handlePrevClick = () => {
    if (currentPage === 1) {
      return searchParams.toString();
    }

    return getSearchWith(searchParams, 'page', currentPage - 1).toString();
  };

  const handleNextClick = () => {
    if (currentPage === buttonCount) {
      return searchParams.toString();
    }

    return getSearchWith(searchParams, 'page', currentPage + 1).toString();
  };

  const handleBtnClick = (number: number) => {
    return getSearchWith(searchParams, 'page', number).toString();
  };

  return (
    <>
      <div
        className="products-list products-list--margin-top-24"
        data-cy="pagination"
      >
        <div className="container">
          <ul className="products-list__products" data-cy="productList">
            <div className="container container--row-gap-40">
              {visibleItems.map(product => (
                <li
                  data-cy="item"
                  key={product.id}
                  className="products-list__product"
                >
                  <ProductCard
                    product={product}
                    favourite={checkInFavourities(product.id)}
                    isInCart={checkInCart(product.id)}
                  />
                </li>
              ))}
            </div>
          </ul>

          {buttonCount > 1 && (
            <ul className="products-list__controllers">
              <li className={cn(
                'products-list__contoller',
                'products-list__contoller--prev',
                {
                  'products-list__contoller--disabled': currentPage === 1,
                },
              )}
              >
                <button
                  aria-label="Previous"
                  data-cy="paginationLeft"
                  type="button"
                  className="products-list__button"
                  disabled={currentPage === 1}
                  onClick={handlePrevClick}
                >
                  <Link
                    data-cy="prevLink"
                    className="products-list__link"
                    to={{ search: handlePrevClick() }}
                    aria-disabled={currentPage === 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        className="products-list__button-icon"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826
                        9.52855 3.52861L5.52855 7.52861C5.26821 7.78896
                        5.26821 8.21107 5.52855 8.47141L9.52855
                        12.4714C9.7889 12.7318 10.211 12.7318 10.4714
                        12.4714C10.7317 12.2111 10.7317 11.789 10.4714
                        11.5286L6.94277 8.00001L10.4714 4.47141C10.7317
                        4.21107 10.7317 3.78896 10.4714 3.52861Z"
                      />
                    </svg>
                  </Link>
                </button>
              </li>

              {pageNumbers.map(number => (
                <li
                  key={number}
                  className={cn('products-list__contoller', {
                    'products-list__contoller--active': number === currentPage,
                  })}
                >
                  <Link
                    data-cy="pageLink"
                    className="products-list__link"
                    to={{ search: handleBtnClick(number) }}
                  >
                    {number}
                  </Link>
                </li>
              ))}

              <li className={cn(
                'products-list__contoller',
                'products-list__contoller--next',
                {
                  'products-list__contoller--disabled':
                    currentPage === buttonCount,
                },
              )}
              >
                <button
                  aria-label="Next"
                  data-cy="paginationRight"
                  type="button"
                  className="products-list__button"
                  onClick={handleNextClick}
                  disabled={currentPage === buttonCount}
                >
                  <Link
                    data-cy="nextLink"
                    className="products-list__link"
                    to={{ search: handleNextClick() }}
                    aria-disabled={currentPage === buttonCount}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <path
                        className="products-list__button-icon"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826
                        6.47145 3.52861L10.4714 7.52861C10.7318 7.78896
                        10.7318 8.21107 10.4714 8.47141L6.47145
                        12.4714C6.2111 12.7318 5.78899 12.7318 5.52864
                        12.4714C5.26829 12.2111 5.26829 11.789 5.52864
                        11.5286L9.05723 8.00001L5.52864 4.47141C5.26829
                        4.21107 5.26829 3.78896 5.52864 3.52861Z"
                      />
                    </svg>
                  </Link>
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
