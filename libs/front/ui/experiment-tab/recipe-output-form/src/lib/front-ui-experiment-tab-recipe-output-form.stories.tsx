import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';
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
      'Channel A Current': { type: RecipeOutputTypes.Number },
      'Channel A Voltage': { type: RecipeOutputTypes.Number },
      'Channel B Current': { type: RecipeOutputTypes.Number },
      'Channel B Voltage': { type: RecipeOutputTypes.Number },
    },
    outerOutputList: {
      'All Channel A Currents': { type: RecipeOutputTypes.NumberArray },
      'All Channel A Voltages': { type: RecipeOutputTypes.NumberArray },
      'All Channel B Currents': { type: RecipeOutputTypes.NumberArray },
      'All Channel B Voltages': { type: RecipeOutputTypes.NumberArray },
    },
  },
};
