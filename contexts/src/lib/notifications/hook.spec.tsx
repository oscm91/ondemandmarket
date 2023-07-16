import { renderHook, act } from '@testing-library/react-hooks';
import { useLazyQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { useNotifications } from './hook';
import { waitFor } from '@testing-library/react';
import { vi } from 'vitest';

vi.mock('@apollo/client', async () => {
  const actual = await vi.importActual('@apollo/client');
  return {
    ...actual as object,
    useLazyQuery: vi.fn(),
  };
});

vi.mock('js-cookie', async () => {
  const actual = await vi.importActual('js-cookie');
  return {
    default: {
      ...actual as object,
      get: vi.fn(() => 'mockUserId'),
      set: vi.fn(),
      remove: vi.fn(),
    },
  };
});

describe('useNotifications', () => {
  const mockNotificationsData = [
    {
      serviceId: '1',
      serviceName: 'Service 1',
      serviceCategories: ['Category 1'],
      serviceDate: 1629158267,
      serviceDescription: 'Description 1',
      serviceLocation: 'Location 1',
      servicePrice: 100,
      serviceStatus: 'Status 1',
    },
  ];
  const mockQueryUserNotifications = vi.fn(() =>
    Promise.resolve({
      data: { notifications: mockNotificationsData },
      loading: false,
      error: null,
    })
  );

  beforeEach(() => {
    (useLazyQuery as vi.mock).mockReturnValue([
      mockQueryUserNotifications,
      {
        data: mockNotificationsData,
        loading: false,
        error: null,
      },
    ]);
    (Cookies.get as vi.mock).mockReturnValue('1');
  });

  it('should return correct notifications state', async () => {
    const { result } = renderHook(() => useNotifications());

    await waitFor(() =>
      expect(result.current.list).toEqual(mockNotificationsData)
    );

    expect(result.current.notificationsLoading).toEqual(false);
  });

  it('should refresh notifications correctly', () => {
    const { result } = renderHook(() => useNotifications());

    act(() => {
      result.current.refreshNotifications();
    });

    expect(mockQueryUserNotifications).toHaveBeenCalledWith({
      variables: { userId: '1' },
    });
  });
});
