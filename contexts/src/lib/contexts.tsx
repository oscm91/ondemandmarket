import { Provider } from 'react-redux';
import { createContext, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import thunk from 'redux-thunk';

import { State } from '@ondemandmarket/models';
import { skillSlice, userSlice } from '@ondemandmarket/reducers';

import { useUser } from './user/hook';
import { useNavigator } from './navigator/hook';
import { useService } from './service/hook';
import { useNotifications } from './notifications/hook';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    skills: skillSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export const StateContext = createContext<State>({
  user: {
    authChecking: true,
    signupLoading: false,
    loginLoading: false,
    skillsLoading: false,
  },
  navigator: {
    pathname: '',
  },
  service: {
    servicesLoading: false,
    createServicesLoading: false,
  },
  notifications: {
    list: [],
    notificationsLoading: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    refreshNotifications: () => {},
  },
});

interface StoreStateProviderProps {
  children: React.ReactNode;
}

export function StoreStateProvider({ children }: StoreStateProviderProps) {
  const user = useUser();
  const navigator = useNavigator();
  const service = useService();
  const notifications = useNotifications();

  const storeState: State = useMemo(
    () => ({ user, navigator, service, notifications }),
    [user, navigator, service, notifications]
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
