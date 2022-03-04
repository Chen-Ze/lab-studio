import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';
import { SubType } from '@lab-studio/shared/util/types';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';

export function frontUiExperimentTabInputProps(): string {
  return 'front-ui-experiment-tab-input-props';
}

export interface InputProps<
  T,
  TRecipe,
  TEntry extends keyof SubType<TRecipe, T>
> {
  parentRecipeFormProps: RecipeFormProps<TRecipe>;
  entry: TRecipe[TEntry] extends T ? TEntry : never;
  label?: string;
  postfix?: string;
  width?: string;
  recipeInfo?: RecipeInfo<T>;
}
