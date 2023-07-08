import type { Meta } from '@storybook/react';
import { Loader } from './loader';

const Story: Meta<typeof Loader> = {
  component: Loader,
  title: 'Components/Loader',
};
export default Story;

export const Primary = {
  args: {},
};
