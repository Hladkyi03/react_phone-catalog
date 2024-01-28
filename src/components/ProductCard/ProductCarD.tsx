import { useContext, useState } from 'react';
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
  product: Product,
  favourite: boolean,
  isInCart: boolean,
};

export const ProductCard: React.FC<Props> = ({
  product,
  favourite = false,
  isInCart = false,
}) => {
  const favouritesReducer = useContext(FavouritesDispatchContext);
  const cartReducer = useContext(CartProductsDispatchContext);

  const {
    id, name, image, price, fullPrice, ram, screen, capacity,
  } = product;

  const [isFavourite, setIsFavourite] = useState(favourite);

  const handleFavouriteClick = () => {
    if (!isFavourite) {
      setIsFavourite(true);
      favouritesReducer({
        type: ActionTypeFavourites.AddFavourites,
        payload: product,
      });
    } else {
      setIsFavourite(false);
      favouritesReducer({
        type: ActionTypeFavourites.DeleteFavourites,
        payload: id,
      });
    }
  };

  const handleAddToCartClick = () => {
    if (!isInCart) {
      cartReducer({ type: ActionTypeCart.AddToCart, payload: product });
    } else {
      cartReducer({ type: ActionTypeCart.DeleteFromCart, payload: id });
    }
  };

  return (
    <div className="product-card">
      <img
        src={image}
        alt="product"
        className="product-card__image"
      />

      <p className="product-card__title">
        {name}
      </p>

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
            <p className="product-card__specification-name">
              Screen
            </p>

            <p className="product-card__specification-value">
              <strong>{screen}</strong>
            </p>
          </div>

          <div className="product-card__specification">
            <p className="product-card__specification-name">
              Capacity
            </p>

            <p className="product-card__specification-value">
              <strong>{capacity}</strong>
            </p>
          </div>

          <div className="product-card__specification">
            <p className="product-card__specification-name">
              RAM
            </p>

            <p className="product-card__specification-value">
              <strong>{ram}</strong>
            </p>
          </div>
        </div>

        <div className="product-card__buttons">
          <button
            className="product-card__add-to-cart"
            type="button"
            aria-label="add-to-cart-btn"
            onClick={handleAddToCartClick}
          >
            {`${isInCart ? 'Add to cart' : 'Added to cart'}`}
          </button>

          <button
            className="product-card__add-to-fav"
            aria-label="favourites-btn"
            type="button"
            onClick={handleFavouriteClick}
          >
            <img
              src={isFavourite ? favouriteActiveSvg : favouriteSvg}
              alt="favourotes"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
