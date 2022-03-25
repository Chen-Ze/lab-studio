import 'reflect-metadata';
import { Story, Meta } from '@storybook/react';
import {
  FrontUiExperimentTabExperimentRoutine,
  FrontUiExperimentTabExperimentRoutineProps,
} from './front-ui-experiment-tab-experiment-routine';
import {
  AResponser,
  BResponser,
  CResponser,
} from './front-ui-experiment-tab-experiment-routine';

export default {
  component: FrontUiExperimentTabExperimentRoutine,
  title: 'FrontUiExperimentTabExperimentRoutine',
} as Meta;

const Template: Story<FrontUiExperimentTabExperimentRoutineProps> = (args) => (
  <FrontUiExperimentTabExperimentRoutine {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
