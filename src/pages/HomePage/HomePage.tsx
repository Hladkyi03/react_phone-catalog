import { useContext } from 'react';
import '../../Container.scss';
import Carousel from '../../components/Carousel/Carousel';
import banner1 from '../../media/carousel/Banner1.png';
import banner2 from '../../media/carousel/Banner2.jpg';
import banner3 from '../../media/carousel/Banner3.png';
import { StateContext } from '../../components/ProductsContext/ProductsContext';
import HotPricesSlider from '../../components/HotPricesSlider/HotPricesSlider';

export const HomePage = () => {
  const state = useContext(StateContext);

  if (!state.products || state.products.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        <Carousel
          images={[banner1, banner2, banner3]}
          frameSize={1}
          itemWidth={1040}
          step={1}
          animationDuration={1000}
          infinite={false}
          nav
        />
      </div>

      <div className="container">
        <HotPricesSlider
          products={[state.products[0], state.products[1],
            state.products[2], state.products[3], state.products[4],
            state.products[5], state.products[6], state.products[7],
            state.products[8], state.products[9],
          ]}
          step={4}
          itemWidth={272}
          gap={16}
          frameSize={4}
          animationDuration={1500}
        />
      </div>
    </>
  );
};
