import { useEffect, useState } from 'react';
import '../Container.scss';
import Carousel from '../components/Carousel/Carousel';
import banner1 from '../media/carousel/banner-phones.png';
import banner2 from '../media/carousel/banner-tablets.png';
import banner3 from '../media/carousel/banner-accessories.png';
import { ShopByCategory } from '../components/ShopByCategory/ShopByCategory';
import { getProducts } from '../api/api';
import { Product } from '../types/Product';
import { BrandNew } from '../components/BrandNew/BrandNew';
import { HotPrices } from '../components/HotPrices/HotPrices';

export const HomePage = () => {
  const [brandNewProducts, setBrandNewProducts] = useState<Product[]>([]);
  const [hotPriceProducts, setHotPriceProducts] = useState<Product[]>([]);

  const getHotPriceProducts = (products: Product[]) => {
    const minimalSale = 0.07;

    return products
      .filter(product => (
        product.fullPrice - product.price >= product.fullPrice * minimalSale
      ))
      .sort((product1, product2) => {
        const firstProductAbsoluteDiscount
          = product1.fullPrice - product1.price;
        const secondProductAbsoluteDiscount
          = product2.fullPrice - product2.price;

        return secondProductAbsoluteDiscount - firstProductAbsoluteDiscount;
      });
  };

  const getBrandNewProducts = (products: Product[]) => {
    const maxYear = products.reduce((max, product) => {
      return (product.year > max) ? product.year : max;
    }, -Infinity);

    return products
      .filter(product => product.year === maxYear)
      .sort((product1, product2) => (
        product2.fullPrice - product1.fullPrice
      ));
  };

  useEffect(() => {
    getProducts()
      .then(response => {
        setBrandNewProducts(getBrandNewProducts(response));
        setHotPriceProducts(getHotPriceProducts(response));
      })
      .catch(() => {
        throw new Error();
      });
  }, []);

  return (
    <>
      <Carousel
        images={[banner1, banner2, banner3]}
        frameSize={1}
        itemWidth={1040}
        step={1}
        animationDuration={1000}
        infinite
        nav
      />

      <HotPrices products={hotPriceProducts} />

      <ShopByCategory />

      <BrandNew products={brandNewProducts} />
    </>
  );
};
