import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';

export function frontUiExperimentTabFormProps(): string {
  return 'front-ui-experiment-tab-form-props';
}

export type RecipeFormProps<TRecipe> = {
  recipe: TRecipe;
  allocator: {
    new (): TRecipe;
  };
  onChange: (newRecipe: TRecipe) => void;
  recipeInfo?: RecipeInfo<TRecipe>;
};
