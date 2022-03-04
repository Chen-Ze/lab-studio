import { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { FrontUiExperimentTabStringInput } from './front-ui-experiment-tab-string-input';

export default {
  component: FrontUiExperimentTabStringInput,
  title: 'FrontUiExperimentTabStringInput',
} as Meta;

class Recipe {
  name = 'Alice';
}

const Template: Story = (args) => {
  const [recipe, setRecipe] = useState(new Recipe());
  return (
    <FrontUiExperimentTabStringInput
      parentRecipeFormProps={{
        recipe,
        allocator: Recipe,
        onChange: setRecipe,
      }}
      entry="name"
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
