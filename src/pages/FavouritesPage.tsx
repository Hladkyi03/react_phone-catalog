import { useContext } from 'react';
import { Catalog } from '../components/Catalog/Catalog';
import { FavouritesContext } from
  '../components/FavouriteContext/FavouriteContext';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';

const breadCrumbsItems = [{ name: 'Favourites', slug: 'favourites' }];

export const FavouritesPage = () => {
  const state = useContext(FavouritesContext);

  return (
    <>
      <div className="container">
        <BreadCrumbs breadCrumbsItems={breadCrumbsItems} />

        <h1 className="catalog__title">
          Favourites
        </h1>

        <p className="catalog__models-count">
          {`${state.favourites.length} models`}
        </p>

      </div>

      <Catalog
        products={state.favourites}
      />
    </>
  );
};
