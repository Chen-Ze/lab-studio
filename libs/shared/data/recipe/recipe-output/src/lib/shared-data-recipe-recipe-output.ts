import { ConvertLeafType } from '@lab-studio/shared/util/types';

export function sharedDataRecipeRecipeOutput(): string {
  return 'shared-data-recipe-recipe-output';
}

export enum RecipeOutputTypes {
  None,
  Any,
  Number,
  NumberArray,
}

export interface RecipeOutput {
  instrumentList?: RecipeInstrumentList;
  innerOutputList: RecipeOutputList;
  outerOutputList: RecipeOutputList;
}

export interface RecipeInstrumentList {
  [name: string]: string;
}

export interface RecipeOutputList {
  [key: string]: RecipeOutputEntry;
}

export interface RecipeOutputEntry {
  type: RecipeOutputTypes;
  declare?: string;
  write?: string;
}

export type RecipeOutputDeclarations = ConvertLeafType<
  RecipeOutput,
  RecipeOutputEntry,
  RecipeOutputTypes
>;
