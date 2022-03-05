import { RecipeOutput } from '@lab-studio/shared/data/recipe/recipe-output';
import { NonFunctionKeys, Primitive } from 'utility-types';

export function sharedDataRecipeRecipe(): string {
  return 'shared-data-recipe-recipe';
}

export type RecipeInfo<TRecipe> = TRecipe extends Primitive
  ? {
      errorMessage?: string;
    }
  : {
      [key in keyof TRecipe]?: RecipeInfo<TRecipe[key]>;
    };

export type PlainifiedRecipe<TRecipe> = TRecipe extends Primitive
  ? TRecipe
  : TRecipe extends object
  ? {
      [key in NonFunctionKeys<TRecipe>]: PlainifiedRecipe<TRecipe[key]>;
    }
  : never;

export interface ExperimentMeasurement<TRecipe> {
  plainifiedRecipe: PlainifiedRecipe<TRecipe>;
  recipeOutput: RecipeOutput;
}
