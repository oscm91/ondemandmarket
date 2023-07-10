import { Navigate } from 'react-router-dom';
import React from 'react';
import { StateContext } from '@ondemandmarket/contexts';

interface PublicRouteProps {
  children: React.ReactElement;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { user, navigator } = React.useContext(StateContext);
  const isAuth = user && user.info && user.info.id;

  if (['/signup', '/login', '/'].includes(navigator.pathname) && isAuth) {
    return <Navigate to="/profile" />;
  }

  return children;
}

export default PublicRoute;
