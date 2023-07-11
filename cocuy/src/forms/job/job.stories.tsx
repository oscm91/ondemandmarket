import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Job, JobProps } from './job';

export default {
  title: 'Forms/Job',
  component: Job,
  argTypes: {
    onFormSubmit: { action: 'submitted' },
    service: { control: 'object' },
    skills: { control: 'object' },
    cities: { control: 'object' },
  },
} as Meta;

const Template: Story<JobProps> = (args) => <Job {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onFormSubmit: (values) => console.log(values),
  service: {
    servicesLoading: false,
    getServiceBySkills: async () => [],
  },
  skills: [],
  cities: {},
};
