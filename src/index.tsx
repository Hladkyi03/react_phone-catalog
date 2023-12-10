import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';

import { App } from './App';
import { GlobalStateProvider } from
  './components/ProductsContext/ProductsContext';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(
    <Router>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </Router>,
  );
