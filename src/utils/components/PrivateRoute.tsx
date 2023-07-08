import { Navigate } from 'react-router-dom';
import React from 'react';
import { StateContext } from '@cocodemy/contexts';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = React.useContext(StateContext) || {};
  return user && user.info && user.info.id ? <>{children}</> : <Navigate to="/signup" />;
}

export default PrivateRoute;
