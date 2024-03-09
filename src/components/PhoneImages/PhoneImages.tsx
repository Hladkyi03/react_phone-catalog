import { useEffect, useState } from 'react';
import './PhoneImages.scss';
import cn from 'classnames';

type Props = {
  images: string[];
};

export const PhoneImages: React.FC<Props> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  useEffect(() => {
    setSelectedImage(images[0]);
  }, [images]);

  return (
    <div className="phone-images">
      <ul className="phone-images__all-photos">
        {images.map((imageUrl) => (
          <li className="phone-images__list-item" key={imageUrl}>
            <button
              className={cn('phone-images__list-button', {
                'phone-images__list-button--active': selectedImage === imageUrl,
              })}
              disabled={selectedImage === imageUrl}
              onClick={() => setSelectedImage(imageUrl)}
              type="button"
            >
              <img
                src={imageUrl}
                alt="phone"
                className="phone-images__side-image"
              />
            </button>
          </li>
        ))}
      </ul>

      <div className="phone-images__main-photo-wrapper">
        <img
          src={selectedImage}
          alt="Phone"
          className="phone-images__main-photo"
        />
      </div>
    </div>
  );
};
