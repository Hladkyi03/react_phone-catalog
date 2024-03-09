import { useContext } from 'react';
import './SuggestedProducts.scss';
import { getSuggestedProducts } from '../../utils/getSuggestedProducts';
import { ProductsContext } from '../ProductsContext/ProductsContext';
import ProductsSlider from '../ProductsSlider/ProductsSlider';

type Props = {
  currentProductId: string;
};

export const SuggestedProducts: React.FC<Props> = ({ currentProductId }) => {
  const state = useContext(ProductsContext);

  const indexToExclude = state.products.findIndex(
    (product) => product.itemId === currentProductId,
  );

  return (
    <div className="suggested-products">
      <ProductsSlider
        products={getSuggestedProducts(state.products, indexToExclude)}
        step={4}
        itemWidth={272}
        gap={16}
        frameSize={4}
        animationDuration={1500}
        title="You may also like"
      />
    </div>
  );
};
