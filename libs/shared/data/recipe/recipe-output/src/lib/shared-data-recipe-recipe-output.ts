import { ConvertLeafType } from '@lab-studio/shared/util/types';
import { Type } from 'class-transformer';

export function sharedDataRecipeRecipeOutput(): string {
  return 'shared-data-recipe-recipe-output';
}

export interface RecipeOutput {
  innerOutputList: RecipeOutputList;
  outerOutputList: RecipeOutputList;
}

export interface RecipeOutputList {
  [key: string]: RecipeOutputEntry;
}

export interface RecipeOutputEntry {
  declare?: string;
  write?: string;
}

export type RecipeOutputFlags = ConvertLeafType<
  RecipeOutput,
  RecipeOutputEntry,
  boolean
>;
