import React, { Reducer, useReducer } from 'react';
import { Product } from '../../types/Product';
import { useLocalStorage } from '../../hooks/useLocalstorage';
import { ActionCart } from '../../types/ActionCart';
import { ActionTypeCart } from '../../types/ActionTypeCart';

function reducer(state: State, action: ActionCart): State {
  switch (action.type) {
    case ActionTypeCart.AddToCart: {
      return {
        cartProducts: [...state.cartProducts, action.payload],
      };
    }

    case ActionTypeCart.DeleteFromCart: {
      const newFavourites = state.cartProducts.filter(item => (
        item.id !== action.payload
      ));

      return {
        cartProducts: newFavourites,
      };
    }

    default:
      return state;
  }
}

type State = {
  cartProducts: Product[],
};

const initialState: State = {
  cartProducts: [],
};

export const CartProductsContext = React.createContext<State>(initialState);
export const CartProductsDispatchContext = React
  .createContext<(action: ActionCart) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const CartStateProvider: React.FC<Props> = ({ children }) => {
  const [cartProducts, setCartProducts] = useLocalStorage<State>(
    'cartProducts',
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
