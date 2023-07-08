import { Navigate } from 'react-router-dom';
import React from 'react';
import { StateContext } from '@cocodemy/contexts';

interface PrivateRouteProps {
  children: React.ReactElement;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = React.useContext(StateContext) || {};
  const isAuth = user && user.info && user.info.id;

  return isAuth ? children : <Navigate to="/signup" />;
}

export default PrivateRoute;
