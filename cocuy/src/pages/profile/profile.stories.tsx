import type { Meta } from '@storybook/react';
import { Profile } from './profile';

const Story: Meta<typeof Profile> = {
  component: Profile,
  title: 'Pages/Profile',
};
export default Story;

export const Primary = {
  args: {
    user: {
      info: {
        email: 'oscm91@hotmail.com',
        firstName: 'Oscar',
        id: '277bu3ylw',
        lastName: 'Mora',
        password: '1234567',
        phoneNumber: '3104949553',
        userType: 'client',
      },
    },
  },
};
