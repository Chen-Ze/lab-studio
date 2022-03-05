import { useArgs } from '@storybook/client-api';
import { Meta, Story } from '@storybook/react';
import {
  FrontUiExperimentTabRecipeOutputForm,
  FrontUiExperimentTabRecipeOutputFormProps,
} from './front-ui-experiment-tab-recipe-output-form';

export default {
  component: FrontUiExperimentTabRecipeOutputForm,
  title: 'FrontUiExperimentTabRecipeOutputForm',
  argTypes: {
    onChange: { action: 'onChange executed!' },
  },
} as Meta;

const Template: Story<FrontUiExperimentTabRecipeOutputFormProps> = (args) => {
  const [argValues, updateArgs] = useArgs();
  return (
    <FrontUiExperimentTabRecipeOutputForm
      {...args}
      onChange={(output) => updateArgs({ output })}
    />
  );
};

export const Primary = Template.bind({});
Primary.args = {
  columns: ['ia', 'ib', 'va', 'vb'],
  output: {
    innerOutputList: {
      'Channel A Current': {},
      'Channel A Voltage': {},
      'Channel B Current': {},
      'Channel B Voltage': {},
    },
    outerOutputList: {
      'All Channel A Currents': {},
      'All Channel A Voltages': {},
      'All Channel B Currents': {},
      'All Channel B Voltages': {},
    },
  },
};
