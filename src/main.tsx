import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { StateProvider } from "@cocodemy/contexts";
import { worker } from '@cocodemy/mock-api';

import './styles.scss';
import App from './app/app';

if (process.env.NODE_ENV === 'development') {
  worker.start().then(r => console.log("Start Mock Api"));
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
