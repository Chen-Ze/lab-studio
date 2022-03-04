import { render } from '@testing-library/react';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';

import { makeExperiment } from './front-ui-experiment-tab-experiment';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';

class Recipe {
  value = 0;
}

function RecipeForm(props: RecipeFormProps<Recipe>) {
  return <NumberInput parentRecipeFormProps={props} entry="value" />;
}

const RecipeExperiment = makeExperiment(RecipeForm, Recipe);

describe('FrontUiExperimentTabExperiment', () => {
  it('should render successfully', () => {
    const recipe = new Recipe();
    const { baseElement } = render(
      <RecipeExperiment
        recipe={recipe}
        onChange={() => {
          /* Do nothing */
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
