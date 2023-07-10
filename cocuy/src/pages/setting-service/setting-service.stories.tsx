import type { Meta } from '@storybook/react';
import { SettingService } from './setting-service';

const Story: Meta<typeof SettingService> = {
  component: SettingService,
  title: 'Pages/SettingService',
};
export default Story;

export const Primary = {
  args: {
    user: {
      skills: [],
    },
  },
};
