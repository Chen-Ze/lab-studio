import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';

export function sharedDataRecipeExperimentScope(): string {
  return 'shared-data-recipe-experiment-scope';
}

export interface ScopeVariables {
  [key: string]: RecipeOutputTypes;
}

export interface ExperimentScope {
  variables: ScopeVariables;
  columns: string[];
}
