import './CssReset/reset.css';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { PhonesPage } from './pages/PhonesPage';
import { TabletsPage } from './pages/TabletsPage';
import { Footer } from './components/Footer/Footer';
import { ProductsDispatchContext } from
  './components/ProductsContext/ProductsContext';
import { getProducts } from './api/api';
import { ActionTypeProducts } from './types/ActionTypeProducts';
import { FavouritesPage } from './pages/FavouritesPage';
import { CartPage } from './pages/CartPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AccessoriesPage } from './pages/AccessoriesPage';

export const App = () => {
  const reducer = useContext(ProductsDispatchContext);

  useEffect(() => {
    getProducts()
      .then(response => {
        reducer({ type: ActionTypeProducts.GetProducts, payload: response });
      })
      .catch(() => {
        throw new Error();
      });
  }, []);

  return (
    <>
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to=".." replace />} />
          <Route path="phones" element={<PhonesPage />} />
          <Route path="tablets" element={<TabletsPage />} />
          <Route path="accesories" element={<AccessoriesPage />} />
          <Route path="product/:id" element={<ProductDetailsPage />} />
          <Route path="favourites" element={<FavouritesPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
};
