import { useNavigate, useLocation } from 'react-router-dom';
import { NavigatorState } from '@cocodemy/models';

export const useNavigator = (): NavigatorState => {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    pathname: location.pathname,
    goToApp: () => {
      navigate('/app');
    },
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
      navigate('/notification');
    },
    goToOrders: () => {
      navigate('/orders');
    },
  };
};
