import {
  Link, NavLink, useLocation, useSearchParams,
} from 'react-router-dom';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import cn from 'classnames';
import { FavouritesContext } from '../FavouriteContext/FavouriteContext';
import { Nav } from '../Nav/Nav';
import logo from '../../media/img/Logo.svg';
import './Header.scss';
import favouriteSvg from '../../media/icons/Favourites.svg';
import CartSvg from '../../media/icons/Cart.svg';
import { CartProductsContext } from '../CartContext/CartContext';

const handleIsActive = ({ isActive }: { isActive: boolean }) => (
  cn('header__link', { 'header__link--active': isActive })
);

const pagesWithSearchBar = [
  '/phones', '/tablets', '/accesories', '/favourites',
];

export const Header = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  const favouritesState = useContext(FavouritesContext);
  const cartState = useContext(CartProductsContext);

  const isCartPage = location.pathname === '/cart';

  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocusClick = () => {
    setIsFocused(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleQueryChange = (newQuery: string) => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    if (!newQuery.trim()) {
      updatedSearchParams.delete('query');
    } else {
      updatedSearchParams.set('query', newQuery.trimStart());
    }

    setSearchParams(updatedSearchParams.toString());
  };

  const handleClearInputClick = () => {
    const updatedSearchParams = new URLSearchParams(searchParams);

    updatedSearchParams.delete('query');

    setSearchParams(updatedSearchParams.toString());

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const isSearchVisible = pagesWithSearchBar.includes(location.pathname);

  return (
    <header className="header">
      <div className="header__wrapper-right">
        <Link to="home">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>

        {!isCartPage && (<Nav />)}
      </div>

      <div className="header__actions-block">
        {isSearchVisible && (
          <div className="header__input-block">
            <input
              type="text"
              className="header__input"
              placeholder={`Search in ${location.pathname.slice(1)}...`}
              onFocus={() => setIsFocused(true)}
              ref={inputRef}
              value={query}
              onChange={e => handleQueryChange(e.target.value)}
            />

            {!isFocused && (
              <button
                className="header__input-button"
                aria-label="focus-input"
                onClick={handleFocusClick}
                type="button"
              >
                <svg
                  className="header__input-icon"
                  data-cy="searchDelete"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.66683 7.33334C2.66683 4.75601 4.75617 2.66668 7.3335
                  2.66668C9.91083 2.66668 12.0002 4.75601 12.0002
                  7.33334C12.0002 8.59061 11.503 9.73176 10.6945
                  10.5709C10.6716 10.5884 10.6497 10.6077 10.6287
                  10.6286C10.6078 10.6495 10.5886 10.6715 10.571
                  10.6943C9.73189 11.5028 8.59075 12 7.3335 12C4.75617
                  12 2.66683 9.91067 2.66683 7.33334ZM11.0786
                  12.0213C10.0522 12.8424 8.75016 13.3333 7.3335
                  13.3333C4.01979 13.3333 1.3335 10.6471 1.3335
                  7.33334C1.3335 4.01963 4.01979 1.33334 7.3335
                  1.33334C10.6472 1.33334 13.3335 4.01963 13.3335
                  7.33334C13.3335 8.75003 12.8425 10.052 12.0214
                  11.0785L14.4715 13.5286C14.7319 13.789 14.7319
                  14.2111 14.4715 14.4714C14.2112 14.7318 13.7891
                  14.7318 13.5287 14.4714L11.0786 12.0213Z"
                    fill="#333333"
                  />
                </svg>
              </button>
            )}

            {isFocused && (
              <button
                className="header__inputbutton"
                aria-label="clear-input-query"
                onClick={handleClearInputClick}
                type="button"
              >
                <svg
                  className="header__input-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.4716 4.47138C12.7319 4.21103 12.7319 3.78892
                  12.4716 3.52858C12.2112 3.26823 11.7891 3.26823
                  11.5288 3.52858L8.00016 7.05717L4.47157
                  3.52858C4.21122 3.26823 3.78911 3.26823 3.52876
                  3.52858C3.26841 3.78892 3.26841 4.21103 3.52876
                  4.47138L7.05735 7.99998L3.52876 11.5286C3.26841
                  11.7889 3.26841 12.211 3.52876 12.4714C3.78911
                  12.7317 4.21122 12.7317 4.47157 12.4714L8.00016
                  8.94279L11.5288 12.4714C11.7891 12.7317 12.2112
                  12.7317 12.4716 12.4714C12.7319 12.211 12.7319
                  11.7889 12.4716 11.5286L8.94297 7.99998L12.4716
                  4.47138Z"
                    fill="#313237"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {!isCartPage && (
          <button className="header__action-button" type="button">
            <div className="header__counter">
              {favouritesState.favourites.length}
            </div>

            <NavLink to="/favourites" className={handleIsActive}>
              <img src={favouriteSvg} alt="favourites-icon" />
            </NavLink>
          </button>
        )}

        <button className="header__action-button" type="button">
          <div className="header__counter">
            {cartState.cartItems.length}
          </div>

          <NavLink to="/cart" className={handleIsActive}>
            <img src={CartSvg} alt="cart-icon" />
          </NavLink>
        </button>
      </div>
    </header>
  );
};
