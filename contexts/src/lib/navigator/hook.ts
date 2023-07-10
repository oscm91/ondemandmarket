import { useNavigate, useLocation } from 'react-router-dom';
import { NavigatorState } from '@cocodemy/models';

export const useNavigator = (): NavigatorState => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    pathname: location.pathname,
    goToHome: () => {
      navigate('/');
    },
    goToLogin: () => {
      navigate('/login');
    },
    goToRegister: () => {
      navigate('/signup');
    },
    goToServices: () => {
      navigate('/settingServices');
    },
    goToProfile: () => {
      navigate('/profile');
    },
    goToNotifications: () => {
      navigate('/notifications');
    },
    goToOrders: () => {
      navigate('/orders');
    },
  };
};
