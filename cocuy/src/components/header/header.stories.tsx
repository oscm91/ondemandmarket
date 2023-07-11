import type { Meta, Story } from '@storybook/react';
import { Header, HeaderProps } from './header';

export default {
  title: 'Components/Header',
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  breadcrumbs: [
    { key: 'home', text: 'Home' },
    { key: 'profile', text: 'Profile' },
  ],
  user: {
    info: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      email: 'john.doe@example.com',
      password: 'password',
      confirmPassword: 'password',
      userType: 'doer',
    },
    authChecking: false,
    signupLoading: false,
    loginLoading: false,
    skillsLoading: false,
  },
  navigator: {
    pathname: '/home',
    goToHome: () => console.log('Go to home'),
    goToRegister: () => console.log('Go to register'),
    goToLogin: () => console.log('Go to login'),
    goToServices: () => console.log('Go to services'),
    goToProfile: () => console.log('Go to profile'),
    goToOrders: () => console.log('Go to orders'),
    goToNotifications: () => console.log('Go to notifications'),
  },
};
