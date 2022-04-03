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
  ExperimentRenderer,
  ExperimentRendererProps,
  renderType,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import { ExperimentProps } from '@lab-studio/front/ui/experiment-tab/experiment';
import { ExperimentMenuItem } from '@lab-studio/front/ui/experiment-tab/experiment-menu';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import {
  ExperimentMeasurement,
  PlainifiedRecipe,
} from '@lab-studio/shared/data/recipe/recipe';
import { RecipeOutput } from '@lab-studio/shared/data/recipe/recipe-output';
import { instanceToPlain } from 'class-transformer';
import { injectable } from 'inversify';

export interface SimpleRecipeBase {
  output(): RecipeOutput;
}

export function makeExperimentRenderer<TRecipe>(
  recipeAllocator: { new (): SimpleRecipeBase },
  Experiment: (props: ExperimentProps<TRecipe>) => JSX.Element,
  icon: JSX.Element,
  iconText: string,
  tag?: string
) {
  tag = tag || recipeAllocator.name;
  @injectable()
  @renderType(tag)
  @itemForType(tag)
  @defaultInputForType(tag)
  class TRenderer
    implements
      ExperimentRenderer<ExperimentMeasurement<TRecipe>, ExperimentScope>,
      ExperimentMenuItemRenderer,
      ExperimentDefaultInputProvider<ExperimentMeasurement<TRecipe>>
  {
    render(
      props: ExperimentRendererProps<
        ExperimentMeasurement<TRecipe>,
        ExperimentScope
      >
    ) {
      return (
        <Experiment
          experimentMeasurement={props.inputData}
          scope={props.environmentData}
          onChange={props.onChange}
        />
      );
    }

    renderMenuItem(props: ExperimentMenuItemRendererProps) {
      return (
        <ExperimentMenuItem icon={icon} text={iconText} onClick={props.onAdd} />
      );
    }

    defaultInput(): ExperimentMeasurement<TRecipe> {
      return {
        plainifiedRecipe: instanceToPlain(
          new recipeAllocator()
        ) as PlainifiedRecipe<TRecipe>,
        recipeOutput: new recipeAllocator().output(),
      };
    }
  }

  return TRenderer;
}
