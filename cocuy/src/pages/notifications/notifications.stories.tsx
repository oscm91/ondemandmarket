import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Notifications, NotificationsProps } from './notifications';

export default {
  title: 'Pages/Notifications',
  component: Notifications,
} as Meta;

const Template: Story<NotificationsProps> = (args) => (
  <Notifications {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  user: {
    info: {
      userType: 'client',
    },
  },
  navigator: {},
  service: {},
  notifications: {
    list: [],
  },
};
