import { useContext } from 'react';
import './Checkout.scss';
import { CartProductsContext } from '../CartContext/CartContext';
import { countTotalQuantity } from '../../utils/countTotalQuantity';
import { countTotalSum } from '../../utils/countTotalSum';

export const Checkout = () => {
  const state = useContext(CartProductsContext);

  const totalQuanity = countTotalQuantity(state.cartItems);

  const totalSum = countTotalSum(state.cartItems);

  return (
    <div className="checkout">
      <h3 className="checkout__total-price">
        {`$${totalSum}`}
      </h3>

      <h4 className="checkout__total-items">
        {`Total for ${totalQuanity} items`}
      </h4>

      <div className="checkout__divider" />

      <button className="checkout__payment-btn" type="button">
        Checkout
      </button>
    </div>
  );
};
