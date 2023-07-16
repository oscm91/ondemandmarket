import { renderHook } from '@testing-library/react-hooks';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useService } from './hook';
import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@apollo/client', async () => {
  const actual = await vi.importActual('@apollo/client');
  return {
    ...actual as object,
    useLazyQuery: vi.fn(),
    useMutation: vi.fn(),
  };
});

describe('useService', () => {
  const mockServicesData = [
    {
      id: '1',
      name: 'Service 1',
      description: 'Description 1',
      category: ['Category 1'],
      date: 1629158267,
      cities: ['City 1'],
      doers: [
        {
          id: '1',
          firstName: 'Doer 1',
          lastName: 'Lastname 1',
          phoneNumber: '1234567890',
          email: 'doer1@example.com',
          price: 100,
        },
      ],
    },
  ];
  const mockQueryServicesBySkills = vi.fn(() =>
    Promise.resolve({
      data: { services: mockServicesData },
    })
  );
  const mockMutationCreateServices = vi.fn(() =>
    Promise.resolve({
      data: { createServices: mockServicesData },
    })
  );

  beforeEach(() => {
    (useLazyQuery as vi.mock).mockReturnValue([
      mockQueryServicesBySkills,
      {
        data: mockServicesData,
        loading: false,
        error: null,
      },
    ]);
    (useMutation as vi.mock).mockReturnValue([
      mockMutationCreateServices,
      {
        data: mockServicesData,
        loading: false,
        error: null,
      },
    ]);
  });

  it('should return correct services state', async () => {
    const { result } = renderHook(() => useService());

    await waitFor(() => {
      expect(result.current.servicesLoading).toEqual(false);
      expect(result.current.createServicesLoading).toEqual(false);
    });
  });

  it('should get services by skills correctly', async () => {
    const { result } = renderHook(() => useService());

    const services = await result.current.getServiceBySkills(mockServicesData);

    expect(services).toEqual(mockServicesData);
    expect(mockQueryServicesBySkills).toHaveBeenCalledWith({
      variables: { services: mockServicesData },
    });
  });

  it('should create services correctly', async () => {
    const { result } = renderHook(() => useService());

    const services = await result.current.createServices(mockServicesData, '1');

    expect(services).toEqual(mockServicesData);
    expect(mockMutationCreateServices).toHaveBeenCalledWith({
      variables: { services: mockServicesData, userId: '1' },
    });
  });
});
