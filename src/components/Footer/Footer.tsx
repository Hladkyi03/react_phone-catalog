import { Link } from 'react-router-dom';
import logo from '../../media/img/Logo.svg';
import './Footer.scss';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <footer className="footer">
      <div className="footer__wrapper-container">
        <Link to="home">
          <img src={logo} alt="logo" className="footer__logo" />
        </Link>

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
          <button
            className="footer__top-button"
            type="button"
            aria-label="Go to top"
            onClick={scrollToTop}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                className="footer__top-button-icon"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.52876 10.4714C3.26841 10.211 3.26841 9.7889 3.52876
                  9.52855L7.52876 5.52856C7.78911 5.26821 8.21122
                  5.26821 8.47157 5.52856L12.4716 9.52856C12.7319 9.78891
                  12.7319 10.211 12.4716 10.4714C12.2112 10.7317 11.7891
                  10.7317 11.5288 10.4714L8.00016 6.94277L4.47157
                  10.4714C4.21122 10.7317 3.78911 10.7317 3.52876
                  10.4714Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};
