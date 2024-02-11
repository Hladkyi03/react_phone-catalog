import { useContext } from 'react';
import { CartProduct } from '../CartProduct/CartProduct';
import './CartCatalog.scss';
import { CartProductsContext } from '../CartContext/CartContext';

export const CartCatalog = () => {
  const state = useContext(CartProductsContext);

  return (
    <div className="cart-catalog">
      {(state.cartItems.length > 0) ? (
        <ul className="cart-catalog__products">
          {state.cartItems.map(item => {
            const { product, id, quantity } = item;

            return (
              <li className="cart-catalog__item" key={id}>
                <CartProduct id={id} product={product} quantity={quantity} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h2>No items in cart yet</h2>
      )}
    </div>
  );
};
