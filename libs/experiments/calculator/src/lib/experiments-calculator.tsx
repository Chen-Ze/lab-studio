import {
  defaultInputForType,
  ExperimentDefaultInputProvider,
} from '@lab-studio/front/feature/experiment-tab/experiment-default-input-provider';
import {
  ExperimentMenuItemRenderer,
  ExperimentMenuItemRendererProps,
  itemForType,
} from '@lab-studio/front/feature/experiment-tab/experiment-menu-renderer';
import {
  renderType,
  ExperimentRenderer,
  ExperimentRendererProps,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { ExperimentMenuItem } from '@lab-studio/front/ui/experiment-tab/experiment-menu';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { StringInput } from '@lab-studio/front/ui/experiment-tab/string-input';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { injectable } from 'inversify';
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

@injectable()
@renderType('Foo')
@itemForType('Foo')
@defaultInputForType('Foo')
export class CalculatorRenderer
  implements
    ExperimentRenderer<
      ExperimentMeasurement<CalculatorRecipe>,
      ExperimentScope
    >,
    ExperimentMenuItemRenderer,
    ExperimentDefaultInputProvider<ExperimentMeasurement<CalculatorRecipe>>
{
  render(
    props: ExperimentRendererProps<
      ExperimentMeasurement<CalculatorRecipe>,
      ExperimentScope
    >
  ) {
    return (
      <CalculatorExperiment
        experimentMeasurement={props.inputData}
        scope={props.environmentData}
        onChange={props.onChange}
      />
    );
  }

  renderMenuItem(props: ExperimentMenuItemRendererProps) {
    return (
      <ExperimentMenuItem
        icon={<CalculatorIcon style={{ width: 60 }} />}
        text="Calculator"
        onClick={props.onAdd}
      />
    );
  }

  defaultInput(): ExperimentMeasurement<CalculatorRecipe> {
    return {
      plainifiedRecipe: {
        value: 0,
        path: '',
      },
      recipeOutput: {
        innerOutputList: {
          Value: {
            type: RecipeOutputTypes.Number,
          },
        },
        outerOutputList: {
          'All values': {
            type: RecipeOutputTypes.NumberArray,
          },
        },
      },
    };
  }
}
