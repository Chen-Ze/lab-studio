import { makeExperimentRenderer } from '@lab-studio/experiments/util';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { StringInput } from '@lab-studio/front/ui/experiment-tab/string-input';
import { ReactComponent as CalculatorIcon } from '../assets/calculator.svg';
import { CalculatorRecipe } from '@lab-studio/shared/experiments/calculator-recipe';

function CalculatorForm(props: RecipeFormProps<CalculatorRecipe>) {
  return (
    <div>
      <StringInput parentRecipeFormProps={props} entry="expression" />
    </div>
  );
}

const CalculatorExperiment = makeExperiment(
  CalculatorForm,
  CalculatorRecipe,
  (recipe) => recipe.output(),
  (recipe, environment) => recipe.info(environment)
);

export const CalculatorRenderer = makeExperimentRenderer(
  CalculatorRecipe,
  CalculatorExperiment,
  <CalculatorIcon style={{ width: 60 }} />,
  'Calculator'
);
