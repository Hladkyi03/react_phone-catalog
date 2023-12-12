import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  infinite: boolean,
  nav: boolean,
};

const getNavIds = (n: number) => {
  const ids = [];

  for (let i = 0; i < n; i += 1) {
    ids.push(i);
  }

  return ids;
};

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  infinite,
  nav,
}) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const [currentNavPosition, setCurrentNavPosition] = useState(0);

  const navIds = getNavIds(Math.ceil(images.length / frameSize));

  const maxNavId = navIds[navIds.length - 1];
  const maxTransform = itemWidth * images.length - frameSize * itemWidth;

  const carouselListDynamicStyles = {
    width: frameSize * itemWidth,
    transform: `translateX(${currentPosition}px)`,
    transition: `transform ${animationDuration / 1000}s ease`,
  };

  const imageDynamicStyles = {
    width: itemWidth,
  };

  const handleNextClick = () => {
    if (currentPosition === -(maxTransform)) {
      if (infinite) {
        setCurrentPosition(0);
        setCurrentNavPosition(0);
      }

      return;
    }

    if ((currentPosition - step * itemWidth) < -maxTransform) {
      setCurrentPosition(-maxTransform);
      setCurrentNavPosition(maxNavId);

      return;
    }

    setCurrentNavPosition(prev => prev + 1);
    setCurrentPosition(prev => prev - step * itemWidth);
  };

  const handlePrevClick = () => {
    if (currentPosition === 0) {
      if (infinite) {
        setCurrentPosition(-maxTransform);
        setCurrentNavPosition(maxNavId);
      }

      return;
    }

    if ((currentPosition + step * itemWidth) > 0) {
      setCurrentPosition(0);
      setCurrentNavPosition(0);

      return;
    }

    setCurrentNavPosition(prev => prev - 1);
    setCurrentPosition(prev => prev + step * itemWidth);
  };

  const handleNavBtnClick = (id: number) => {
    if (id === maxNavId) {
      setCurrentPosition(-maxTransform);
    } else {
      setCurrentPosition(-(step * itemWidth * id));
    }

    setCurrentNavPosition(id);
  };

  return (
    <div className="carousel">
      <div className="container">
        <div className="carousel__wrapper">
          <ul className="carousel__list" style={carouselListDynamicStyles}>
            {images.map(imageUrl => (
              <li key={imageUrl}>
                <img
                  src={imageUrl}
                  alt="carousel_image"
                  className="carousel__image"
                  style={imageDynamicStyles}
                />
              </li>
            ))}
          </ul>
        </div>

        {nav && (
          <nav className="carousel__nav">
            {navIds.map(navId => (
              <button
                type="button"
                className={`carousel__nav-button ${navId === currentNavPosition
                  ? 'carousel__nav-button--active'
                  : ''}`}
                aria-label={`Go to slide ${navId}`}
                key={navId}
                onClick={() => handleNavBtnClick(navId)}
              />
            ))}
          </nav>
        )}

        <button
          aria-label="Previous"
          data-cy="prev"
          type="button"
          className="carousel__button carousel__button--prev"
          onClick={handlePrevClick}
          disabled={currentPosition === 0 && !infinite}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              className="carousel__button-icon"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.4714 3.52861C10.211 3.26826 9.7889 3.26826 9.52855
              3.52861L5.52855 7.52861C5.26821 7.78896 5.26821 8.21107
              5.52855 8.47141L9.52855 12.4714C9.7889 12.7318 10.211
              12.7318 10.4714 12.4714C10.7317 12.2111 10.7317 11.789 10.4714
              11.5286L6.94277 8.00001L10.4714 4.47141C10.7317 4.21107
              10.7317 3.78896 10.4714 3.52861Z"
            />
          </svg>
        </button>
        <button
          aria-label="Next"
          data-cy="next"
          type="button"
          className="carousel__button carousel__button--next"
          onClick={handleNextClick}
          disabled={currentPosition === -(maxTransform) && !infinite}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              className="carousel__button-icon"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.52864 3.52861C5.78899 3.26826 6.2111 3.26826 6.47145
              3.52861L10.4714 7.52861C10.7318 7.78896 10.7318 8.21107
              10.4714 8.47141L6.47145 12.4714C6.2111 12.7318 5.78899
              12.7318 5.52864 12.4714C5.26829 12.2111 5.26829 11.789
              5.52864 11.5286L9.05723 8.00001L5.52864 4.47141C5.26829
              4.21107 5.26829 3.78896 5.52864 3.52861Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
