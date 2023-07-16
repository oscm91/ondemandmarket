// PrivateRoute.test.js
import {render, screen} from '@testing-library/react'
import React from 'react'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {StateContext} from '@ondemandmarket/contexts'
import PrivateRoute from './PrivateRoute'
import { vi } from 'vitest';

vi.mock('@apollo/client', async () => {
  const actual = await vi.importActual('@apollo/client');
  return {
    ...actual as object,
    ApolloClient: vi.fn(() => ({
      uri: 'http://localhost:4200/graphql',
      cache: new actual.InMemoryCache(),
    })),
  };
});

test('renders children when user is authenticated', () => {
  const user = {info: {id: '123'}}

  render(
    <StateContext.Provider value={{user}}>
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <p>Private Content</p>
              </PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </StateContext.Provider>,
  )

  // verify private content is rendered
  expect(screen.getByText('Private Content')).toBeDefined()
})

test('redirects to signup when user is not authenticated', () => {
  const user = null

  render(
    <StateContext.Provider value={{user}}>
      <MemoryRouter initialEntries={['/private']}>
        <Routes>
          <Route
            path="/private"
            element={
              <PrivateRoute>
                <p>Private Content</p>
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={
            <p>Signup Page</p>
          }/>
        </Routes>
      </MemoryRouter>
    </StateContext.Provider>,
  )

  // verify redirection to signup page
  expect(screen.getByText('Signup Page')).toBeDefined()
})
