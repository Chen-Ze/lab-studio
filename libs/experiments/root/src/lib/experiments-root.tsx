import {
  defaultInputForType,
  ExperimentDefaultInputProvider,
} from '@lab-studio/front/feature/experiment-tab/experiment-default-input-provider';
import {
  renderType,
  ExperimentRenderer,
  ExperimentRendererProps,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { StringInput } from '@lab-studio/front/ui/experiment-tab/string-input';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';
import { injectable } from 'inversify';

class RootRecipe {
  dataPath = '';
}

function RootForm(props: RecipeFormProps<RootRecipe>) {
  return <StringInput parentRecipeFormProps={props} entry="dataPath" />;
}

const RootExperiment = makeExperiment(RootForm, RootRecipe, (recipe) => ({
  innerOutputList: {
    $Global: {
      type: RecipeOutputTypes.Number,
    },
  },
  outerOutputList: {},
}));

@injectable()
@renderType('Root')
@defaultInputForType('Root')
export class RootRenderer
  implements
    ExperimentRenderer<ExperimentMeasurement<RootRecipe>, ExperimentScope>,
    ExperimentDefaultInputProvider<ExperimentMeasurement<RootRecipe>>
{
  render(
    props: ExperimentRendererProps<
      ExperimentMeasurement<RootRecipe>,
      ExperimentScope
    >
  ) {
    return (
      <RootExperiment
        experimentMeasurement={props.inputData}
        scope={props.environmentData}
        onChange={props.onChange}
      />
    );
  }

  defaultInput(): ExperimentMeasurement<RootRecipe> {
    return {
      plainifiedRecipe: {
        dataPath: '',
      },
      recipeOutput: {
        innerOutputList: {
          $Global: {
            type: RecipeOutputTypes.Number,
          },
        },
        outerOutputList: {},
      },
    };
  }
}
