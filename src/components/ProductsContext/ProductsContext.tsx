import React, { Reducer, useReducer, useState } from 'react';
import { Product } from '../../types/Product';
import { ActionProducts } from '../../types/ActionProducts';
import { ActionTypeProducts } from '../../types/ActionTypeProducts';

function reducer(state: State, action: ActionProducts): State {
  switch (action.type) {
    case ActionTypeProducts.GetProducts: {
      return {
        products: action.payload,
      };
    }

    default:
      return state;
  }
}

type State = {
  products: Product[],
};

const initialState: State = {
  products: [],
};

export const ProductsContext = React.createContext<State>(initialState);
export const ProductsDispatchContext = React
  .createContext<(action: ActionProducts) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<State>(initialState);

  const [state, dispatch] = useReducer<Reducer<State, ActionProducts>>(
    reducer,
    todos,
  );

  const dispatchAndSave = (action: ActionProducts) => {
    dispatch(action);
    setTodos((prevState: State) => reducer(prevState, action));
  };

  return (
    <ProductsDispatchContext.Provider value={dispatchAndSave}>
      <ProductsContext.Provider value={state}>
        {children}
      </ProductsContext.Provider>
    </ProductsDispatchContext.Provider>
  );
};
