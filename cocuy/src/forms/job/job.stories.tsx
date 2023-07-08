import type { Meta } from '@storybook/react';
import { Job } from './job';

const Story: Meta<typeof Job> = {
  component: Job,
  title: 'Job',
};
export default Story;

export const Primary = {
  args: {},
};
