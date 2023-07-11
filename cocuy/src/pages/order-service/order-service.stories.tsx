import React from 'react';
import { Meta, Story } from '@storybook/react';
import { OrderService, OrderServiceProps } from './order-service';

export default {
  title: 'Pages/OrderService',
  component: OrderService,
} as Meta;

const Template: Story<OrderServiceProps> = (args) => <OrderService {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  user: {
    info: {
      id: '1',
      skills: [],
    },
  },
  navigator: {},
  service: {},
  notifications: {},
};
