import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';

export function sharedDataRecipeExperimentScope(): string {
  return 'shared-data-recipe-experiment-scope';
}

export interface ScopeVariables {
  [key: string]: RecipeOutputTypes;
}

export type InstrumentName = string;

export type InstrumentModel = string;

export interface ScopeInstruments {
  [key: InstrumentName]: InstrumentModel;
}

export interface ExperimentScope {
  variables: ScopeVariables;
  columns: string[];
  addresses: string[];
  instruments: ScopeInstruments;
}
