import React, { Reducer, useReducer } from 'react';
import { Product } from '../../types/Product';
import { ActionTypeFavourites } from '../../types/ActionTypeFavourites';
import { ActionFavourites } from '../../types/ActionFavourites';
import { useLocalStorage } from '../../hooks/useLocalstorage';

function reducer(state: State, action: ActionFavourites): State {
  switch (action.type) {
    case ActionTypeFavourites.AddFavourites: {
      return {
        favourites: [...state.favourites, action.payload],
      };
    }

    case ActionTypeFavourites.DeleteFavourites: {
      const newFavourites = state.favourites.filter(item => (
        item.id !== action.payload
      ));

      return {
        favourites: newFavourites,
      };
    }

    default:
      return state;
  }
}

type State = {
  favourites: Product[],
};

const initialState: State = {
  favourites: [],
};

export const FavouritesContext = React.createContext<State>(initialState);
export const FavouritesDispatchContext = React
  .createContext<(action: ActionFavourites) => void>(() => { });

type Props = {
  children: React.ReactNode;
};

export const FavouritesStateProvider: React.FC<Props> = ({ children }) => {
  const [favourites, setFavourites] = useLocalStorage<State>(
    'favourites',
    initialState,
  );

  const [state, dispatch] = useReducer<Reducer<State, ActionFavourites>>(
    reducer,
    favourites,
  );

  const dispatchAndSave = (action: ActionFavourites) => {
    dispatch(action);
    setFavourites((prevState: State) => reducer(prevState, action));
  };

  return (
    <FavouritesDispatchContext.Provider value={dispatchAndSave}>
      <FavouritesContext.Provider value={state}>
        {children}
      </FavouritesContext.Provider>
    </FavouritesDispatchContext.Provider>
  );
};
