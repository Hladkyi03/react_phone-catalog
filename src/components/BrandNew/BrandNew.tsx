import { Product } from '../../types/Product';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import './BrandNew.scss';

type Props = {
  products: Product[],
};

export const BrandNew: React.FC<Props> = ({ products }) => {
  return (
    <div className="brand-new brand-new--margin-top-80">
      <ProductsSlider
        products={products}
        step={4}
        itemWidth={272}
        gap={16}
        frameSize={4}
        animationDuration={1500}
        title="Brand new models"
      />
    </div>
  );
};
