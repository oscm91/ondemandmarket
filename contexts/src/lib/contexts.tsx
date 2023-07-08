import { Provider } from 'react-redux';
import { createContext, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import thunk from 'redux-thunk';

import { State } from '@cocodemy/models';
import { userSlice } from "@cocodemy/reducers";

import { useUser } from './user/hook';
import { useNavigator } from './navigator/hook';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export const StateContext = createContext<State | null>(null);

interface StoreStateProviderProps {
  children: React.ReactNode;
}

export function StoreStateProvider({ children }: StoreStateProviderProps) {
  const user = useUser();
  const navigator = useNavigator();

  const storeState:State = useMemo(() => ({ user, navigator }), [user, navigator]);

  return (
    <StateContext.Provider value={storeState}>
      {children}
    </StateContext.Provider>
  );
}

interface StateProviderProps {
  children: React.ReactNode;
}

const client = new ApolloClient({
  uri: 'http://localhost:4200/graphql', // Reemplaza esto con la URL de tu API GraphQL
  cache: new InMemoryCache(),
});

export function StateProvider({ children }: StateProviderProps) {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Provider store={store}>
          <StoreStateProvider>
            {children}
          </StoreStateProvider>
        </Provider>
      </BrowserRouter>
    </ApolloProvider>
  );
}
