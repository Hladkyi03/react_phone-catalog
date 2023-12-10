import React, { Reducer, useReducer, useState } from 'react';
import { Product } from '../../types/Product';
import { Action } from '../../types/Action';
import { ActionType } from '../../types/ActionType';

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.GetProducts: {
      return { products: action.payload };
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

export const StateContext = React.createContext<State>(initialState);
export const DispatchContext = React
  .createContext<(action: Action) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<State>(initialState);

  const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, todos);

  const dispatchAndSave = (action: Action) => {
    dispatch(action);
    setTodos((prevState: State) => reducer(prevState, action));
  };

  return (
    <DispatchContext.Provider value={dispatchAndSave}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
