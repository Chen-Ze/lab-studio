import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { FrontUiExperimentTabBooleanInput } from './front-ui-experiment-tab-boolean-input';

export default {
  component: FrontUiExperimentTabBooleanInput,
  title: 'FrontUiExperimentTabBooleanInput',
} as Meta;

class Recipe {
  someBoolean = true;
}

const Template: Story = (args) => {
  const [recipe, setRecipe] = useState(new Recipe());
  return (
    <FrontUiExperimentTabBooleanInput
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
      entry="someBoolean"
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
