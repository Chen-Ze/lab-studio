import { render } from '@testing-library/react';

import { makeSubRecipeInput } from './front-ui-experiment-tab-sub-recipe-form';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';

class FooRecipe {
  fooValue = 123;
  subRecipe = new FooSubRecipe();
}

class FooSubRecipe {
  fooSubValue = 456;
}

function FooRecipeForm(props: RecipeFormProps<FooRecipe>) {
  const recipe = new FooRecipe();
  return (
    <div>
      <NumberInput parentRecipeFormProps={props} entry="fooValue" />
      <FooSubRecipeInput parentRecipeFormProps={props} entry="subRecipe" />
    </div>
  );
}

function FooSubRecipeForm(props: RecipeFormProps<FooSubRecipe>) {
  return <NumberInput parentRecipeFormProps={props} entry="fooSubValue" />;
}

const FooSubRecipeInput = makeSubRecipeInput(FooSubRecipeForm, FooSubRecipe);

describe('FrontUiExperimentTabSubRecipeForm', () => {
  const recipe = new FooRecipe();
  it('should render successfully', () => {
    const { baseElement } = render(
      <FooRecipeForm
        recipe={recipe}
        allocator={FooRecipe}
        onChange={() => {
          /* Do nothing*/
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
