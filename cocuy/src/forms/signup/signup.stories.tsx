import type { Meta } from '@storybook/react';
import { Signup } from './signup';

const Story: Meta<typeof Signup> = {
  component: Signup,
  title: 'Forms/Signup',
};
export default Story;

export const Primary = {
  args: {},
};
