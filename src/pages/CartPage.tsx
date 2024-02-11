import { Link } from 'react-router-dom';
import { CartCatalog } from '../components/CartCatalog/CartCatalog';
import { Checkout } from '../components/Checkout/Checkout';

export const CartPage = () => {
  return (
    <>
      <div className="container">
        <Link
          className="cart-catalog__back-link"
          to="/"
          onClick={() => window.history.back()}
        >
          Back
        </Link>

        <h1 className="catalog__title">
          Cart
        </h1>

        <CartCatalog />

        <Checkout />
      </div>
    </>
  );
};
