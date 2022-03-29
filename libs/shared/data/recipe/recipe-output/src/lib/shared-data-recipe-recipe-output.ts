import * as R from 'ramda';

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

export function mergeRecipeOutput(
  oldOutput: RecipeOutput,
  newOutputTemplate: RecipeOutput
): RecipeOutput {
  const newOutput = R.mapObjIndexed(
    (list: Record<string, unknown>, listKey: keyof RecipeOutput) =>
      R.mapObjIndexed(
        (value: unknown, key: string) => oldOutput[listKey]?.[key] || list[key],
        list
      ),
    newOutputTemplate
  );
  return newOutput as RecipeOutput;
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
