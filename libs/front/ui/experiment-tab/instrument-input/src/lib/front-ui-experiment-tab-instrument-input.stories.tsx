import { InstrumentName } from '@lab-studio/shared/data/recipe/experiment-scope';
import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { FrontUiExperimentTabInstrumentInput } from './front-ui-experiment-tab-instrument-input';

export default {
  component: FrontUiExperimentTabInstrumentInput,
  title: 'FrontUiExperimentTabInstrumentInput',
} as Meta;

class Recipe {
  instrument: InstrumentName = '';
}

const Template: Story = (args) => {
  const [recipe, setRecipe] = useState(new Recipe());
  return (
    <FrontUiExperimentTabInstrumentInput
      parentRecipeFormProps={{
        recipe,
        allocator: Recipe,
        onChange: setRecipe,
        scope: {
          columns: [],
          instruments: {
            Gate: 'keithley-2400',
            Bias: 'keithley-2400',
            Cryostat: 'lake-shore-336',
            Magnet: 'lake-shore-625',
            Compressor: 'sumitomo-f70',
          },
          variables: {},
          addresses: [],
        },
      }}
      entry="instrument"
      model="keithley-2400"
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
