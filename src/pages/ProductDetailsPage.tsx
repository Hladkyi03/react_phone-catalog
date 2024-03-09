import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getProductDetails } from '../api/api';
import { ProductDetails } from '../types/ProductDetails';
import { BreadCrumbs } from '../components/BreadCrumbs/BreadCrumbs';
import { TechSpecs } from '../components/TechSpecs/TechSpecs';
import { AboutPhone } from '../components/AboutPhone/AboutPhone';
import { SuggestedProducts } from
  '../components/SuggestedProducts/SuggestedProducts';
import { PhoneOptions } from '../components/PhoneOptions/PhoneOptions';
import { FavouritesContext } from
  '../components/FavouriteContext/FavouriteContext';
import { CartProductsContext } from '../components/CartContext/CartContext';
import { ProductsContext } from '../components/ProductsContext/ProductsContext';
import { PhoneImages } from '../components/PhoneImages/PhoneImages';

export const ProductDetailsPage = () => {
  const { id } = useParams();

  const [phoneDetails, setPhoneDetails] = useState<ProductDetails | null>(null);

  const productsState = useContext(ProductsContext);
  const favouritesState = useContext(FavouritesContext);
  const CartState = useContext(CartProductsContext);

  useEffect(() => {
    getProductDetails(id as string)
      .then((response) => {
        setPhoneDetails(response);
      })
      .catch((err: Error) => {
        throw new Error(err.message);
      });
  }, [id]);

  const breadCrumbsItems = [
    { name: 'Phones', slug: '/phones' },
    {
      name: phoneDetails?.name || '',
      slug: phoneDetails ? `product/${phoneDetails?.id}` : '',
    },
  ];

  const product = productsState.products.find((item) => item.itemId === id);

  const checkInFavourities = (productId: string) => {
    return favouritesState.favourites.some((item) => item.id === productId);
  };

  const checkInCart = (productId: string) => {
    return CartState.cartItems.some((item) => item.product.id === productId);
  };

  if (!id || !phoneDetails || !product) {
    return <BreadCrumbs breadCrumbsItems={breadCrumbsItems} />;
  }

  const {
    name,
    images,
    colorsAvailable,
    color,
    namespaceId,
    priceDiscount,
    priceRegular,
    screen,
    resolution,
    processor,
    ram,
    capacity,
    capacityAvailable,
    camera,
    zoom,
    cell,
    description,
  } = phoneDetails;

  return (
    <>
      <div className="container">
        <BreadCrumbs breadCrumbsItems={breadCrumbsItems} />

        <Link
          className="
            cart-catalog__back-link
            cart-catalog__back-link--margin-top-24"
          to="/"
          onClick={() => window.history.back()}
        >
          Back
        </Link>

        <h1 className="phone-title">{name}</h1>
      </div>

      <div className="container container--row-gap-80 container--margin-top-40">
        <PhoneImages images={images} />

        <PhoneOptions
          colorsAvailable={colorsAvailable}
          color={color}
          namespaceId={namespaceId}
          capacity={capacity}
          availableCapacity={capacityAvailable}
          id={phoneDetails.id}
          priceDiscount={priceDiscount}
          priceRegular={priceRegular}
          processor={processor}
          resolution={resolution}
          favourite={checkInFavourities(product.id)}
          isInCart={checkInCart(product.id)}
          product={product}
        />

        <AboutPhone phoneDescription={description} />

        <TechSpecs
          screen={screen}
          resolution={resolution}
          processor={processor}
          ram={ram}
          capacity={capacity}
          camera={camera}
          zoom={zoom}
          cell={cell}
        />

        <SuggestedProducts currentProductId={id} />
      </div>
    </>
  );
};
