import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';
import { GlobalStateProvider } from
  './components/ProductsContext/ProductsContext';
import { FavouritesStateProvider } from
  './components/FavouriteContext/FavouriteContext';
import { CartStateProvider } from './components/CartContext/CartContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <GlobalStateProvider>
        <FavouritesStateProvider>
          <CartStateProvider>
            <App />
          </CartStateProvider>
        </FavouritesStateProvider>
      </GlobalStateProvider>
    </Router>,
  );
