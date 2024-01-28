import './CssReset/reset.css';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { Footer } from './components/Footer/Footer';
import { ProductsDispatchContext } from
  './components/ProductsContext/ProductsContext';
import { getProducts } from './api/api';
import { ActionTypeProducts } from './types/ActionTypeProducts';
import { FavouritesPage } from './pages/FavouritesPage/FavouritesPage';

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
          <Route path="favourites" element={<FavouritesPage />} />
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
