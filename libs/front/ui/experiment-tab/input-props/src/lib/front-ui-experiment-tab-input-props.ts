import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';
import { SubType } from '@lab-studio/shared/util/types';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { PickByValue, PickByValueExact } from 'utility-types';

export function frontUiExperimentTabInputProps(): string {
  return 'front-ui-experiment-tab-input-props';
}

export interface InputProps<
  T,
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, T>
> {
  parentRecipeFormProps: RecipeFormProps<TRecipe>;
  entry: TEntry;
  label?: string;
  postfix?: string;
  width?: string;
  recipeInfo?: RecipeInfo<T>;
}
