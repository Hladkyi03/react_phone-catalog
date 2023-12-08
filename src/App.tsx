import './CssReset/reset.css';
import 'normalize.css';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonesPage } from './pages/PhonesPage/PhonesPage';
import { TabletsPage } from './pages/TabletsPage/TabletsPage';
import { Footer } from './components/Footer/Footer';

export const App = () => (
  <>
    <Header />

    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="home" element={<Navigate to=".." replace />} />
        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </main>

    <Footer />
  </>
);
