import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { FrontUiExperimentTabEnumInput } from './front-ui-experiment-tab-enum-input';

export default {
  component: FrontUiExperimentTabEnumInput,
  title: 'FrontUiExperimentTabEnumInput',
} as Meta;

enum ChannelMode {
  SweepCurrent = 'Sweep Current',
  SweepVoltage = 'Sweep Voltage',
  FixedCurrent = 'Fixed Current',
  FixedVoltage = 'Fixed Voltage',
}

class ChannelRecipe {
  mode = ChannelMode.FixedVoltage;
}

const Template: Story = (args) => {
  const [recipe, setRecipe] = useState(new ChannelRecipe());
  return (
    <FrontUiExperimentTabEnumInput
      parentRecipeFormProps={{
        recipe,
        allocator: ChannelRecipe,
        onChange: setRecipe,
        scope: {
          columns: [],
          instruments: {},
          variables: {},
          addresses: [],
        },
      }}
      enumObject={ChannelMode}
      entry="mode"
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: '',
  postfix: '',
  width: '',
};
