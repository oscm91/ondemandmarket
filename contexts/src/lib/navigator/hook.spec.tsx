import { renderHook, act } from '@testing-library/react-hooks';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNavigator } from './hook';
import { vi } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

describe('useNavigator', () => {
  const mockNavigate = vi.fn();
  const mockLocation = {
    pathname: '/test',
  };

  beforeEach(() => {
    (useNavigate as vi.mock).mockReturnValue(mockNavigate);
    (useLocation as vi.mock).mockReturnValue(mockLocation);
  });

  it('should return correct navigator state', () => {
    const { result } = renderHook(() => useNavigator());

    expect(result.current.pathname).toEqual('/test');
  });

  it('should navigate correctly', () => {
    const { result } = renderHook(() => useNavigator());

    act(() => {
      result.current.goToHome();
      result.current.goToLogin();
      result.current.goToRegister();
      result.current.goToServices();
      result.current.goToProfile();
      result.current.goToNotifications();
      result.current.goToOrders();
    });

    expect(mockNavigate).toHaveBeenCalledWith('/');
    expect(mockNavigate).toHaveBeenCalledWith('/login');
    expect(mockNavigate).toHaveBeenCalledWith('/signup');
    expect(mockNavigate).toHaveBeenCalledWith('/settingServices');
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
    expect(mockNavigate).toHaveBeenCalledWith('/notifications');
    expect(mockNavigate).toHaveBeenCalledWith('/orders');
  });
});
