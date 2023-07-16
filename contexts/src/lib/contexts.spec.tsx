import { render, screen } from '@testing-library/react';
import { StateProvider } from './contexts'; // Asegúrate de reemplazar esto con la ruta correcta a tu componente
import { vi } from 'vitest';

// Mock de los hooks
vi.mock('./user/hook', () => ({
  useUser: () => ({
    /* retorna el estado mock del usuario aquí */
  }),
}));

vi.mock('./navigator/hook', () => ({
  useNavigator: () => ({
    /* retorna el estado mock del navegador aquí */
  }),
}));

vi.mock('./service/hook', () => ({
  useService: () => ({
    /* retorna el estado mock del servicio aquí */
  }),
}));

vi.mock('./notifications/hook', () => ({
  useNotifications: () => ({
    /* retorna el estado mock de las notificaciones aquí */
  }),
}));

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

describe('StateProvider', () => {
  it('renders its children', () => {
    const TestComponent = () => <div>Test Component</div>;

    render(
      <StateProvider>
        <TestComponent />
      </StateProvider>
    );

    expect(screen.getByText('Test Component')).toBeDefined();
  });
});
