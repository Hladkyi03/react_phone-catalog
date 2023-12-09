import '../../Container.scss';
import Carousel from '../../components/Carousel/Carousel';
import banner1 from '../../media/carousel/Banner1.png';
import banner2 from '../../media/carousel/Banner2.jpg';
import banner3 from '../../media/carousel/Banner3.png';

export const HomePage = () => (
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
    <h1>HomePage</h1>
  </>
);
