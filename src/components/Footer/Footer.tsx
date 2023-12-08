import { Link } from 'react-router-dom';
import logo from '../../media/img/Logo.svg';
import './Footer.scss';

export const Footer = () => (
  <footer className="footer">
    <div className="footer__wrapper-container">
      <img src={logo} alt="logo" />

      <nav className="nav nav--footer">
        <ul className="nav__list">
          <li className="nav__item">
            <Link
              to="https://github.com/Hladkyi03"
              className="nav__link"
              target="_blank"
            >
              github
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="/contacts"
              className="nav__link"
              target="_blank"
            >
              contacts
            </Link>
          </li>
          <li className="nav__item">
            <Link
              to="/rights"
              className="nav__link"
              target="_blank"
            >
              rights
            </Link>
          </li>
        </ul>
      </nav>

      <div className="footer__right-wrapper">
        <p className="footer__right-text">Back to top</p>
        <button className="footer__top-button" type="button">
          s
        </button>
      </div>
    </div>
  </footer>
);
