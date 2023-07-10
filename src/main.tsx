import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { StateProvider } from '@ondemandmarket/contexts';
import { worker } from '@ondemandmarket/mock-api';

import './styles.scss';
import App from './app/app';

const basename = import.meta.env.VITE_APP_BASENAME;

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  worker
    .start({
      serviceWorker: {
        url:
          basename === '/'
            ? '/mockServiceWorker.js'
            : '/ondemandmarket/mockServiceWorker.js',
      },
    })
    .then((r) => console.log('Start Mock Api'));
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>
);
