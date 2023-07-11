import type { Meta } from '@storybook/react';
import { Login } from './login';

const Story: Meta<typeof Login> = {
  component: Login,
  title: 'Forms/Login',
};
export default Story;

export const Primary = {
  args: {},
};
