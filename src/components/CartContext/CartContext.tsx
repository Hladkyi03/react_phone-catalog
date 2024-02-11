import React, { Reducer, useReducer } from 'react';
import { useLocalStorage } from '../../hooks/useLocalstorage';
import { ActionCart } from '../../types/ActionCart';
import { ActionTypeCart } from '../../types/ActionTypeCart';
import { CartItem } from '../../types/CartItem';
import { getItemId } from '../../utils/getItemId';

function reducer(state: State, action: ActionCart): State {
  switch (action.type) {
    case ActionTypeCart.AddToCart: {
      const item = action.payload;

      const newCartItem = {
        product: item,
        id: getItemId(state.cartItems),
        quantity: 1,
      };

      return {
        cartItems: [...state.cartItems, newCartItem],
      };
    }

    case ActionTypeCart.DeleteFromCart: {
      const newCartItems = state.cartItems.filter(item => (
        item.id !== action.payload
      ));

      return {
        cartItems: newCartItems,
      };
    }

    case ActionTypeCart.ChangeQuantity: {
      const { id, newQuantity } = action.payload;

      if (newQuantity < 1) {
        return state;
      }

      const updatedCartItems = state.cartItems.map(item => (
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));

      return {
        cartItems: updatedCartItems,
      };
    }

    default:
      return state;
  }
}

type State = {
  cartItems: CartItem[],
};

const initialState: State = {
  cartItems: [],
};

export const CartProductsContext = React.createContext<State>(initialState);
export const CartProductsDispatchContext = React
  .createContext<(action: ActionCart) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const CartStateProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<State>(
    'cartItems',
    initialState,
  );

  const [state, dispatch] = useReducer<Reducer<State, ActionCart>>(
    reducer,
    cartProducts,
  );

  const dispatchAndSave = (action: ActionCart) => {
    dispatch(action);
    setCartProducts((prevState: State) => reducer(prevState, action));
  };

  return (
    <CartProductsDispatchContext.Provider value={dispatchAndSave}>
      <CartProductsContext.Provider value={state}>
        {children}
      </CartProductsContext.Provider>
    </CartProductsDispatchContext.Provider>
  );
};
