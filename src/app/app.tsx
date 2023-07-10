import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

import {
  Access,
  EarlyAccess,
  Loader,
  Notifications,
  OrderService,
  Page,
  Profile,
  Register,
  SettingService,
} from '@ondemandmarket/cocuy';
import { StateContext } from '@ondemandmarket/contexts';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from '../utils/components/PrivateRoute';
import { PublicRoute } from '../utils/components/PublicRoute';

export function App() {
  const { user, navigator, service, notifications } =
    React.useContext(StateContext);

  if (
    !user ||
    (user && user.authChecking) ||
    user.signupLoading ||
    user.skillsLoading ||
    notifications.notificationsLoading
  ) {
    return (
      <Page>
        <Loader />
      </Page>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Page>
              <EarlyAccess navigator={navigator} />
            </Page>
          </PublicRoute>
        }
      />
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
        path="/notifications"
        element={
          <PrivateRoute>
            <Page>
              <Notifications
                user={user}
                navigator={navigator}
                service={service}
                notifications={notifications}
              />
            </Page>
          </PrivateRoute>
        }
      />
      <Route
        path="/settingServices"
        element={
          <PrivateRoute>
            <Page wrap>
              <SettingService user={user} navigator={navigator} />
            </Page>
          </PrivateRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <PrivateRoute>
            <Page wrap>
              <OrderService
                user={user}
                navigator={navigator}
                service={service}
                notifications={notifications}
              />
            </Page>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Page wrap>
              <Profile user={user} navigator={navigator} />
            </Page>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
