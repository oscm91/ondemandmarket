import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Page, EarlyAccess, Register, Access } from "@cocodemy/cocuy";
import { StateContext } from '@cocodemy/contexts';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../utils/components/PrivateRoute';
import { PublicRoute } from '../utils/components/PublicRoute';
import { Loader } from '@cocodemy/cocuy';

export function App() {
  const { user, navigator } = React.useContext(StateContext);

  if (!user || (user && user.authChecking) || user.signupLoading) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  return (
    <Routes>
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Page>
              <Register user={user} navigator={navigator} />
            </Page>
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Page>
              <Access user={user} navigator={navigator} />
            </Page>
          </PublicRoute>
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
          <PublicRoute>
            <Page>Página raíz</Page>
          </PublicRoute>
        }
      />
    </Routes>
  );
}

export default App;
