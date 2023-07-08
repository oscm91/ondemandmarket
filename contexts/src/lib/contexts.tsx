import { Provider } from 'react-redux';
import { createContext, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import thunk from 'redux-thunk';

import { State } from '@cocodemy/models';
import { userSlice } from '@cocodemy/reducers';

import { useUser } from './user/hook';
import { useNavigator } from './navigator/hook';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const StateContext = createContext<State>({
  user: {
    authChecking: true,
    signupLoading: false,
    loginLoading: false,
  },
  navigator: {
    pathname: '',
  },
});

interface StoreStateProviderProps {
  children: React.ReactNode;
}

export function StoreStateProvider({ children }: StoreStateProviderProps) {
  const user = useUser();
  const navigator = useNavigator();

  const storeState: State = useMemo(
    () => ({ user, navigator }),
    [user, navigator]
  );

  return (
    <StateContext.Provider value={storeState}>{children}</StateContext.Provider>
  );
}

interface StateProviderProps {
  children: React.ReactNode;
}

const basename = import.meta.env.VITE_APP_BASENAME;

const client = new ApolloClient({
  uri:
    basename === '/'
      ? 'http://localhost:4200/graphql'
      : 'https://oscm91.github.io/ondemandmarket/graphql', // Reemplaza esto con la URL de tu API GraphQL
  cache: new InMemoryCache(),
});

export function StateProvider({ children }: StateProviderProps) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter basename={basename}>
        <Provider store={store}>
          <StoreStateProvider>{children}</StoreStateProvider>
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}
