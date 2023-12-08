import { Nav } from '../Nav/Nav';
import './Header.scss';
import favouriteSvg from '../../media/icons/Favourites.svg';
import CartSvg from '../../media/icons/Cart.svg';

export const Header = () => {
  return (
    <header className="header">
      <Nav />

      <div className="header__actions-block">
        <button className="header__action-button" type="button">
          <img src={favouriteSvg} alt="cart-icon" />
        </button>
        <button className="header__action-button" type="button">
          <img src={CartSvg} alt="cart-icon" />
        </button>
      </div>
    </header>
  );
};
