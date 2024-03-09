import { useContext } from 'react';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import './ProductCard.scss';
import favouriteSvg from '../../media/icons/Favourites.svg';
import favouriteActiveSvg from '../../media/icons/Favourites-Red.svg';
import { FavouritesDispatchContext } from
  '../FavouriteContext/FavouriteContext';
import { ActionTypeFavourites } from '../../types/ActionTypeFavourites';
import { ActionTypeCart } from '../../types/ActionTypeCart';
import { CartProductsDispatchContext } from '../CartContext/CartContext';

type Props = {
  product: Product;
  favourite: boolean;
  isInCart: boolean;
};

export const ProductCard: React.FC<Props> = ({
  product,
  favourite = false,
  isInCart = false,
}) => {
  const favouritesReducer = useContext(FavouritesDispatchContext);
  const cartReducer = useContext(CartProductsDispatchContext);

  const {
    id, phoneId, name, image, price, fullPrice, ram, screen, capacity,
  }
    = product;

  const handleFavouriteClick = () => {
    if (!favourite) {
      favouritesReducer({
        type: ActionTypeFavourites.AddFavourites,
        payload: product,
      });
    } else {
      favouritesReducer({
        type: ActionTypeFavourites.DeleteFavourites,
        payload: id,
      });
    }
  };

  const handleAddToCartClick = () => {
    if (!isInCart) {
      cartReducer({ type: ActionTypeCart.AddToCart, payload: product });
    }
  };

  return (
    <div className="product-card">
      <Link to={`/product/${phoneId}`} className="product-card__link">
        <img src={image} alt="product" className="product-card__image" />

        <p className="product-card__title">{name}</p>
      </Link>

      <div className="product-card__bottom-wrapper">
        <div className="product-card__prices-wrapper">
          <p className="product-card__price">
            $
            {price}
          </p>

          {price !== fullPrice && (
            <p className="product-card__discount-price">
              $
              {fullPrice}
            </p>
          )}
        </div>

        <div className="product-card__specifications">
          <div className="product-card__specification">
            <p className="product-card__specification-name">Screen</p>

            <p className="product-card__specification-value">
              <strong>{screen}</strong>
            </p>
          </div>

          <div className="product-card__specification">
            <p className="product-card__specification-name">Capacity</p>

            <p className="product-card__specification-value">
              <strong>{capacity}</strong>
            </p>
          </div>

          <div className="product-card__specification">
            <p className="product-card__specification-name">RAM</p>

            <p className="product-card__specification-value">
              <strong>{ram}</strong>
            </p>
          </div>
        </div>

        <div className="product-card__buttons">
          <button
            className={cn('product-card__add-to-cart', {
              'product-card__add-to-cart--active': isInCart,
            })}
            type="button"
            aria-label="add-to-cart-btn"
            onClick={handleAddToCartClick}
          >
            {`${isInCart ? 'Added to cart' : 'Add to cart'}`}
          </button>

          <button
            className={cn('product-card__add-to-fav', {
              'product-card__add-to-fav--active': favourite,
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
      </div>
    </div>
  );
};
