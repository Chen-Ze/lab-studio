import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';

export interface ExperimentProps<TRecipe> {
  recipe: TRecipe;
  onChange: (newRecipe: TRecipe) => void;
}

export function makeExperiment<TRecipe>(
  element: (props: RecipeFormProps<TRecipe>) => JSX.Element,
  allocator: { new (): TRecipe }
) {
  return (experimentProps: ExperimentProps<TRecipe>) =>
    element({
      ...experimentProps,
      allocator,
    });
}
