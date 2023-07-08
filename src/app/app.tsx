import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Page, EarlyAccess, Register } from '@cocodemy/cocuy';
import { StateContext } from '@cocodemy/contexts';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../utils/components/PrivateRoute';

export function App() {
  const { user, navigator } = React.useContext(StateContext) || {};
  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <Page>
            <Register user={user} navigator={navigator} />
          </Page>
        }
      />
      <Route
        path="/login"
        element={
          <Page>
            Página login
          </Page>
        }
      />
      <Route
        path="/app"
        element={
          <PrivateRoute>
            <Page>
              <EarlyAccess />
            </Page>
          </PrivateRoute>

        }
      />
      <Route
        path="/"
        element={
          <Page>
            Página raíz
          </Page>
        }
      />
    </Routes>
  );
}

export default App;
