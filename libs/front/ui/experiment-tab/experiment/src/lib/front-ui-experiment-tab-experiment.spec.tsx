import { render } from '@testing-library/react';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';

import { makeExperiment } from './front-ui-experiment-tab-experiment';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { instanceToPlain } from 'class-transformer';
import { PlainifiedRecipe } from '@lab-studio/shared/data/recipe/recipe';

class Recipe {
  value = 0;
}

function RecipeForm(props: RecipeFormProps<Recipe>) {
  return <NumberInput parentRecipeFormProps={props} entry="value" />;
}

const RecipeExperiment = makeExperiment(RecipeForm, Recipe, () => ({
  innerOutputList: {},
  outerOutputList: {},
}));

describe('FrontUiExperimentTabExperiment', () => {
  it('should render successfully', () => {
    const recipe = instanceToPlain(new Recipe()) as PlainifiedRecipe<Recipe>;
    const output = {
      innerOutputList: {},
      outerOutputList: {},
    };
    const { baseElement } = render(
      <RecipeExperiment
        experimentMeasurement={{
          plainifiedRecipe: recipe,
          recipeOutput: output,
        }}
        onChange={() => {
          /* Do nothing */
        }}
        columns={[]}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
