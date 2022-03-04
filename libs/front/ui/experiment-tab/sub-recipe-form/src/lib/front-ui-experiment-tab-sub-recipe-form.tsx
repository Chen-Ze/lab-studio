import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { InputProps } from '@lab-studio/front/ui/experiment-tab/input-props';
import { SubType } from '@lab-studio/shared/util/types';

interface SubRecipeFormProps<
  TRecipe,
  TSubRecipe,
  TEntry extends keyof SubType<TRecipe, TSubRecipe>
> {
  parentRecipeFormProps: RecipeFormProps<TRecipe>;
  entry: TRecipe[TEntry] extends TSubRecipe ? TEntry : never;
  subRecipeForm: (props: RecipeFormProps<TSubRecipe>) => JSX.Element;
  allocator: {
    new (): TSubRecipe;
  };
}

function FrontUiExperimentTabSubRecipeForm<
  TRecipe,
  TSubRecipe,
  TEntry extends keyof SubType<TRecipe, TSubRecipe>
>(props: SubRecipeFormProps<TRecipe, TSubRecipe, TEntry>) {
  return props.subRecipeForm({
    recipe: props.parentRecipeFormProps.recipe[
      props.entry
    ] as unknown as TSubRecipe,
    // eslint-disable-next-line
    // @ts-ignore
    recipeInfo: props.parentRecipeFormProps.recipeInfo?.[props.entry],
    allocator: props.allocator,
    onChange: (newSubRecipe) => {
      const newRecipe = Object.assign(
        new props.parentRecipeFormProps.allocator(),
        props.parentRecipeFormProps.recipe
      );
      // eslint-disable-next-line
      // @ts-ignore
      newRecipe[props.entry] = newSubRecipe;
      props.parentRecipeFormProps.onChange(newRecipe);
    },
  });
}

export function makeSubRecipeInput<TSubRecipe>(
  subRecipeForm: SubRecipeFormProps<
    unknown,
    TSubRecipe,
    never
  >['subRecipeForm'],
  allocator: SubRecipeFormProps<unknown, TSubRecipe, never>['allocator']
) {
  return function <TRecipe, TEntry extends keyof SubType<TRecipe, TSubRecipe>>(
    props: InputProps<TSubRecipe, TRecipe, TEntry>
  ) {
    return (
      <FrontUiExperimentTabSubRecipeForm
        {...props}
        allocator={allocator}
        subRecipeForm={subRecipeForm}
      />
    );
  };
}
