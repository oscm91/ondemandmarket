// PublicRoute.test.js
import {render, screen} from '@testing-library/react'
import React from 'react'
import {MemoryRouter, Route, Routes} from 'react-router-dom'
import {StateContext} from '@ondemandmarket/contexts'
import PublicRoute from './PublicRoute'
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

test('redirects to profile when user is authenticated and on a public route', () => {
  const user = {info: {id: '123'}}
  const navigator = {pathname: '/signup'}

  render(
    <StateContext.Provider value={{user, navigator}}>
      <MemoryRouter initialEntries={['/signup']}>
        <Routes>
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <p>Signup Page</p>
              </PublicRoute>
            }
          />
          <Route path="/profile" element={
            <p>Profile Page</p>
          }/>
        </Routes>
      </MemoryRouter>
    </StateContext.Provider>,
  )

  // verify redirection to profile page
  expect(screen.getByText('Profile Page')).toBeDefined()
})

test('renders children when user is not authenticated or not on a public route', () => {
  const user = null
  const navigator = {pathname: '/other'}

  render(
    <StateContext.Provider value={{user, navigator}}>
      <MemoryRouter initialEntries={['/other']}>
        <Routes>
          <Route
            path="/other"
            element={
              <PublicRoute>
                <p>Other Page</p>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </StateContext.Provider>,
  )

  // verify other page content is rendered
  expect(screen.getByText('Other Page')).toBeDefined()
})
