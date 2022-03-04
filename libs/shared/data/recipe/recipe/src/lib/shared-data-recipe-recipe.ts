export function sharedDataRecipeRecipe(): string {
  return 'shared-data-recipe-recipe';
}

export type RecipeInfo<Recipe> = Recipe extends
  | number
  | string
  | boolean
  | bigint
  ? {
      errorMessage?: string;
    }
  : {
      [key in keyof Recipe]?: RecipeInfo<Recipe[key]>;
    };
