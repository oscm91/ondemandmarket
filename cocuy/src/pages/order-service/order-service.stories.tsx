import type { Meta } from '@storybook/react';
import { OrderService } from './order-service';

const Story: Meta<typeof OrderService> = {
  component: OrderService,
  title: 'Pages/OrderService',
};
export default Story;

export const Primary = {
  args: {
    user: {
      skills: []
    }
  },
};
