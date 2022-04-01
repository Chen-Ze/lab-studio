import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { RecipeOutputForm } from '@lab-studio/front/ui/experiment-tab/recipe-output-form';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import {
  ExperimentMeasurement,
  PlainifiedRecipe,
  RecipeInfo,
} from '@lab-studio/shared/data/recipe/recipe';
import {
  mergeRecipeOutput,
  RecipeOutput,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import styled from 'styled-components';

export interface ExperimentProps<TRecipe> {
  experimentMeasurement: ExperimentMeasurement<TRecipe>;
  onChange: (newRecipe: ExperimentMeasurement<TRecipe>) => void;
  scope: ExperimentScope;
}

const DivCentered = styled.div`
  display: flex;
  justify-content: center;
`;

export function makeExperiment<TRecipe>(
  experimentForm: (props: RecipeFormProps<TRecipe>) => JSX.Element,
  allocator: { new (): TRecipe },
  getRecipeOutput: (recipe: TRecipe) => RecipeOutput,
  getRecipeInfo?: (
    recipe: TRecipe,
    environment?: ExperimentScope
  ) => RecipeInfo<TRecipe>
) {
  return (experimentProps: ExperimentProps<TRecipe>) => {
    const recipe = plainToInstance(
      allocator,
      experimentProps.experimentMeasurement.plainifiedRecipe
    );
    const recipeInfo = getRecipeInfo?.(recipe, experimentProps.scope);
    const scope = experimentProps.scope;
    return (
      <div>
        <DivCentered>
          {experimentForm({
            recipe,
            onChange: (newRecipe) => {
              const newRecipeOutput = getRecipeOutput(newRecipe);
              experimentProps.onChange({
                plainifiedRecipe: instanceToPlain(
                  newRecipe
                ) as PlainifiedRecipe<TRecipe>,
                recipeOutput: mergeRecipeOutput(
                  experimentProps.experimentMeasurement.recipeOutput,
                  newRecipeOutput
                ),
              });
            },
            allocator,
            recipeInfo,
            scope,
          })}
        </DivCentered>
        <div>
          <RecipeOutputForm
            columns={experimentProps.scope.columns}
            output={experimentProps.experimentMeasurement.recipeOutput}
            onChange={(newRecipeOutput) => {
              // couldn't use the recipe in the props
              // idk why
              experimentProps.onChange({
                plainifiedRecipe: instanceToPlain(
                  recipe
                ) as PlainifiedRecipe<TRecipe>,
                recipeOutput: newRecipeOutput,
              });
            }}
          />
        </div>
      </div>
    );
  };
}
