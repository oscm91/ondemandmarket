import type { Meta } from '@storybook/react';
import { Notifications } from './notifications';

const Story: Meta<typeof Notifications> = {
  component: Notifications,
  title: 'Notifications',
};
export default Story;

export const Primary = {
  args: {},
};
