import { Product } from '../../types/Product';
import './ProductCard.scss';
import favouriteSvg from '../../media/icons/Favourites.svg';

type Props = {
  product: Product,
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name, imageUrl, price, discount, ram, screen, capacity,
  } = product;

  return (
    <div className="product-card">
      <img
        src={imageUrl}
        alt="product"
        className="product-card__image"
      />

      <p className="product-card__title">
        {name}
      </p>

      <div className="product-card__prices-wrapper">
        <p className="product-card__price">
          $
          {price}
        </p>

        {discount > 0 && (
          <p className="product-card__discount-price">
            $
            {discount}
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
        >
          Add to cart
        </button>

        <button
          className="product-card__add-to-fav"
          aria-label="favourites-btn"
          type="button"
        >
          <img src={favouriteSvg} alt="favourotes" />
        </button>
      </div>
    </div>
  );
};
