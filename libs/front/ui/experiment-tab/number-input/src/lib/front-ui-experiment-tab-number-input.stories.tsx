import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { FrontUiExperimentTabNumberInput } from './front-ui-experiment-tab-number-input';

export default {
  component: FrontUiExperimentTabNumberInput,
  title: 'FrontUiExperimentTabNumberInput',
} as Meta;

class Recipe {
  someValue = 0;
  someBoolean = false;
}

const Template: Story = (args) => {
  const [recipe, setRecipe] = useState(new Recipe());
  return (
    <FrontUiExperimentTabNumberInput
      parentRecipeFormProps={{
        recipe,
        allocator: Recipe,
        onChange: setRecipe,
        scope: {
          columns: [],
          instruments: {},
          variables: {},
          addresses: [],
        },
      }}
      entry="someValue"
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
