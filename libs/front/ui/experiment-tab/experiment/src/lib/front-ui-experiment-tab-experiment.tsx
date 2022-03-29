import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import {
  ExperimentMeasurement,
  PlainifiedRecipe,
  RecipeInfo,
} from '@lab-studio/shared/data/recipe/recipe';
import {
  RecipeOutput,
  RecipeOutputDeclarations,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import * as R from 'ramda';
import { RecipeOutputForm } from '@lab-studio/front/ui/experiment-tab/recipe-output-form';
import styled from 'styled-components';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';

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
  getRecipeOutput: (recipe: TRecipe) => RecipeOutputDeclarations,
  getRecipeInfo?: (recipe: TRecipe) => RecipeInfo<TRecipe>
) {
  return (experimentProps: ExperimentProps<TRecipe>) => {
    const recipe = plainToInstance(
      allocator,
      experimentProps.experimentMeasurement.plainifiedRecipe
    );
    const recipeInfo = getRecipeInfo?.(recipe);
    const scope = experimentProps.scope;
    return (
      <div>
        <DivCentered>
          {experimentForm({
            recipe,
            onChange: (newRecipe) => {
              const newRecipeOutputFlags = getRecipeOutput(newRecipe);
              const oldRecipeOutput =
                experimentProps.experimentMeasurement.recipeOutput;
              const filteredInnerOutputFlags = R.filter(
                (x) => x !== RecipeOutputTypes.None,
                newRecipeOutputFlags.innerOutputList
              );
              const filteredOuterOutputFlags = R.filter(
                (x) => x !== RecipeOutputTypes.None,
                newRecipeOutputFlags.outerOutputList
              );
              const newRecipeOutput: RecipeOutput = {
                innerOutputList: R.mapObjIndexed(
                  (___, key) => oldRecipeOutput.innerOutputList[key] || {},
                  filteredInnerOutputFlags
                ),
                outerOutputList: R.mapObjIndexed(
                  (___, key) => oldRecipeOutput.outerOutputList[key] || {},
                  filteredOuterOutputFlags
                ),
              };
              experimentProps.onChange({
                plainifiedRecipe: instanceToPlain(
                  newRecipe
                ) as PlainifiedRecipe<TRecipe>,
                recipeOutput: newRecipeOutput,
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
