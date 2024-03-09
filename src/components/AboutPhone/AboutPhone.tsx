import { ProductDescription } from '../../types/ProductDetails';
import './AboutPhone.scss';

type Props = {
  phoneDescription: ProductDescription[];
};

export const AboutPhone: React.FC<Props> = ({ phoneDescription }) => (
  <div className="about-phone">
    <h2 className="about-phone__title">About</h2>

    <div className="about-phone__divider" />

    <ul className="about-phone__list">
      {phoneDescription.map((item) => (
        <li className="about-phone__list-item" key={item.title}>
          <h3 className="about-phone__item-title">{item.title}</h3>

          <ul className="about-phone__paragraphs-list">
            {item.text.map((paragraph) => (
              <li className="about-phone__paragraphs-item" key={paragraph}>
                {paragraph}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </div>
);
