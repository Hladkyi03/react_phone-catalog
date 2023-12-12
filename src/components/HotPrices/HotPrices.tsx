import { Product } from '../../types/Product';
import ProductsSlider from '../ProductsSlider/ProductsSlider';
import './HotPrices.scss';

type Props = {
  products: Product[],
};

export const HotPrices: React.FC<Props> = ({ products }) => {
  return (
    <div className="hot-prices hot-prices--margin-top-80">
      <ProductsSlider
        products={products}
        step={4}
        itemWidth={272}
        gap={16}
        frameSize={4}
        animationDuration={1500}
        title="Hot Prices"
      />
    </div>
  );
};
