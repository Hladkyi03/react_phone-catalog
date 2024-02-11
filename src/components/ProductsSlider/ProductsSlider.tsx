import React, { useContext, useState } from 'react';
import './ProductsSlider.scss';
import { Product } from '../../types/Product';
import { ProductCard } from '../ProductCard/ProductCard';
import { FavouritesContext } from '../FavouriteContext/FavouriteContext';
import { CartProductsContext } from '../CartContext/CartContext';

type Props = {
  products: Product[],
  step: number,
  frameSize: number,
  itemWidth: number,
  gap: number,
  animationDuration: number,
  title: string,
};

const ProductsSlider: React.FC<Props> = ({
  products,
  step,
  frameSize,
  itemWidth,
  gap,
  animationDuration,
  title,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const state = useContext(FavouritesContext);
  const CartState = useContext(CartProductsContext);

  const checkInFavourities = (id: string) => {
    return state.favourites.some(item => (
      item.id === id
    ));
  };

  const checkInCart = (id: string) => {
    return CartState.cartItems.some(item => (
      item.product.id === id
    ));
  };

  const maxTransform = (itemWidth + gap) * products.length
    - frameSize * (itemWidth + gap);

  const SliderListDynamicStyles = {
    width: frameSize * itemWidth + gap * (frameSize - 1),
    transform: `translateX(${currentPosition}px)`,
    transition: `transform ${animationDuration / 1000}s ease`,
  };

  const handleNextClick = () => {
    if (currentPosition === -(maxTransform)) {
      return;
    }

    if ((currentPosition - step * itemWidth - gap * step) < -maxTransform) {
      setCurrentPosition(-maxTransform);

      return;
    }

    setCurrentPosition(prev => prev - step * itemWidth - gap * step);
  };

  const handlePrevClick = () => {
    if (currentPosition === 0) {
      return;
    }

    if ((currentPosition + step * itemWidth + gap * step) > 0) {
      setCurrentPosition(0);

      return;
    }

    setCurrentPosition(prev => prev + step * itemWidth + gap * step);
  };

  return (
    <div className="hot-prices-slider">
      <div className="container">
        <div className="hot-prices-slider__wrapper">
          <ul
            className="hot-prices-slider__list"
            style={SliderListDynamicStyles}
          >
            {products.map(product => (
              <li key={product.id}>
                <ProductCard
                  product={product}
                  favourite={checkInFavourities(product.id)}
                  isInCart={checkInCart(product.id)}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="hot-prices-slider__header">
          <h3 className="hot-prices-slider__title">
            {title}
          </h3>

          <div className="hot-prices-slider__buttons-wrapper">
            <button
              aria-label="Previous"
              data-cy="prev"
              type="button"
              className="hot-prices-slider__button
                hot-prices-slider__button--prev"
              onClick={handlePrevClick}
              disabled={currentPosition === 0
                || frameSize > products.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  className="hot-prices-slider__button-icon"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855
              3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107
              5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211
              12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714
              11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107
              10.7317 3.78896 10.4714 3.52861Z"
                />
              </svg>
            </button>
            <button
              aria-label="Next"
              data-cy="next"
              type="button"
              className="hot-prices-slider__button
                hot-prices-slider__button--next"
              onClick={handleNextClick}
              disabled={currentPosition === -(maxTransform)
                || frameSize > products.length}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
              >
                <path
                  className="hot-prices-slider__button-icon"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145
              3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107
              10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899
              12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789
              5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829
              4.21107 5.26829 3.78896 5.52864 3.52861Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSlider;
