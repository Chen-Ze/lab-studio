import { makeExperimentRenderer } from '@lab-studio/experiments/util';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { StringInput } from '@lab-studio/front/ui/experiment-tab/string-input';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { ReactComponent as CalculatorIcon } from '../assets/calculator.svg';

class CalculatorRecipe {
  value = 0;
  path = '';

  output(): RecipeOutput {
    return {
      innerOutputList: {
        Value: {
          type: RecipeOutputTypes.Number,
          declare: 'v',
          write: 'v',
        },
      },
      outerOutputList: {
        'All values': {
          type: RecipeOutputTypes.NumberArray,
          declare: 'V',
        },
      },
    };
  }
}

function CalculatorForm(props: RecipeFormProps<CalculatorRecipe>) {
  return (
    <div>
      <NumberInput parentRecipeFormProps={props} entry="value" />
      <StringInput parentRecipeFormProps={props} entry="path" />
    </div>
  );
}

const CalculatorExperiment = makeExperiment(
  CalculatorForm,
  CalculatorRecipe,
  (recipe) => recipe.output()
);

export const CalculatorRenderer = makeExperimentRenderer(
  CalculatorRecipe,
  CalculatorExperiment,
  <CalculatorIcon style={{ width: 60 }} />,
  'Calculator'
);
