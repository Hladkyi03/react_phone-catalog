import './Nav.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import logo from '../../media/img/Logo.svg';

const handleIsActive = ({ isActive }: { isActive: boolean }) => (
  classNames('nav__link', { 'nav__link--active': isActive })
);

export const Nav = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="nav">
      <Link to="home">
        <img src={logo} alt="logo" className="nav__logo" />
      </Link>

      <ul className="nav__list">
        <li className="nav__item">
          <NavLink
            to="/home"
            className={`nav__link ${path === '/' ? 'nav__link--active' : ''}`}
          >
            home
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/phones" className={handleIsActive}>
            Phones
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/tablets" className={handleIsActive}>
            tablets
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink to="/accesories" className={handleIsActive}>
            accessories
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
