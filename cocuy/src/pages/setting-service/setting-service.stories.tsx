import type { Meta } from '@storybook/react';
import { SettingService } from './setting-service';

const Story: Meta<typeof SettingService> = {
  component: SettingService,
  title: 'SettingService',
};
export default Story;

export const Primary = {
  args: {},
};
