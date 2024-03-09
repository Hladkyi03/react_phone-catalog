import cn from 'classnames';
import './PhoneOptions.scss';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { PRODUCT_COLORS } from '../../types/ProductColors';
import favouriteSvg from '../../media/icons/Favourites.svg';
import favouriteActiveSvg from '../../media/icons/Favourites-Red.svg';
import { FavouritesDispatchContext } from
  '../FavouriteContext/FavouriteContext';
import { CartProductsDispatchContext } from '../CartContext/CartContext';
import { ActionTypeFavourites } from '../../types/ActionTypeFavourites';
import { ActionTypeCart } from '../../types/ActionTypeCart';
import { Product } from '../../types/Product';

type Props = {
  colorsAvailable: string[];
  color: string;
  namespaceId: string;
  capacity: string;
  availableCapacity: string[];
  id: string;
  priceRegular: number;
  priceDiscount: number;
  processor: string;
  resolution: string;
  isInCart: boolean;
  favourite: boolean;
  product: Product;
};

export const PhoneOptions: React.FC<Props> = ({
  colorsAvailable,
  color,
  namespaceId,
  capacity,
  availableCapacity,
  priceRegular,
  priceDiscount,
  processor,
  resolution,
  isInCart,
  favourite,
  product,
}) => {
  const favouritesReducer = useContext(FavouritesDispatchContext);
  const cartReducer = useContext(CartProductsDispatchContext);

  const handleFavouriteClick = () => {
    if (!favourite) {
      favouritesReducer({
        type: ActionTypeFavourites.AddFavourites,
        payload: product,
      });
    } else {
      favouritesReducer({
        type: ActionTypeFavourites.DeleteFavourites,
        payload: product.id,
      });
    }
  };

  const handleAddToCartClick = () => {
    if (!isInCart) {
      cartReducer({ type: ActionTypeCart.AddToCart, payload: product });
    }
  };

  return (
    <div className="phone-options">
      <div className="phone-options__header">
        <h3 className="phone-options__caption">Available colors</h3>

        <h4 className="phone-options__id">{`ID: ${product.id}`}</h4>
      </div>

      <div className="phone-options__wrapper">
        <div className="phone-options__available-colors">
          <ul className="phone-options__list">
            {colorsAvailable.map((colorValue) => (
              <li key={colorValue} className="phone-options__color">
                <Link
                  to={`/product/${namespaceId}-${capacity.toLowerCase()}-${colorValue}`}
                  style={{
                    backgroundColor: PRODUCT_COLORS[colorValue],
                  }}
                  className={cn('phone-options__color-link', {
                    'phone-options__color-link--active': color === colorValue,
                  })}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="phone-options__divider" />

        <div className="phone-options__available-capacity">
          <h3 className="phone-options__caption">Select capacity</h3>

          <ul className="phone-options__list">
            {availableCapacity.map((capacityValue) => (
              <li
                key={capacityValue}
                className={cn('phone-options__capacity', {
                  'phone-options__capacity--active': capacity === capacityValue,
                })}
              >
                <Link
                  to={`/product/${namespaceId}-${capacityValue.toLowerCase()}-${color}`}
                  className={cn('phone-options__capacity-link', {
                    'phone-options__capacity-link--active':
                      capacity === capacityValue,
                  })}
                >
                  {capacityValue}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="phone-options__divider" />

        <div className="phone-options__bottom-wrapper">
          <div className="phone-options__prices-wrapper">
            <p className="phone-options__price">
              $
              {priceDiscount}
            </p>

            {priceRegular !== priceDiscount && (
              <p className="phone-options__discount-price">
                $
                {priceRegular}
              </p>
            )}
          </div>

          <div className="phone-options__buttons">
            <button
              className={cn('phone-options__add-to-cart', {
                'phone-options__add-to-cart--active': isInCart,
              })}
              type="button"
              aria-label="add-to-cart-btn"
              onClick={handleAddToCartClick}
            >
              {`${isInCart ? 'Added to cart' : 'Add to cart'}`}
            </button>

            <button
              className={cn('phone-options__add-to-fav', {
                'phone-options__add-to-fav--active': favourite,
              })}
              aria-label="favourites-btn"
              type="button"
              onClick={handleFavouriteClick}
            >
              <img
                src={favourite ? favouriteActiveSvg : favouriteSvg}
                alt="favourotes"
              />
            </button>
          </div>

          <div className="phone-options__specifications">
            <div className="phone-options__specification">
              <p className="phone-options__specification-name">Screen</p>

              <p className="phone-options__specification-value">
                <strong>{product.screen}</strong>
              </p>
            </div>

            <div className="phone-options__specification">
              <p className="phone-options__specification-name">Resolution</p>

              <p className="phone-options__specification-value">
                <strong>{resolution}</strong>
              </p>
            </div>

            <div className="phone-options__specification">
              <p className="phone-options__specification-name">Processor</p>

              <p className="phone-options__specification-value">
                <strong>{processor}</strong>
              </p>
            </div>

            <div className="phone-options__specification">
              <p className="phone-options__specification-name">RAM</p>

              <p className="phone-options__specification-value">
                <strong>{product.ram}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
