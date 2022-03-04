import { InputProps } from '@lab-studio/front/ui/experiment-tab/input-props';
import { SubType } from '@lab-studio/shared/util/types';
import { FormControlLabel, Switch } from '@mui/material';
import humanizeString from 'humanize-string';
import titleize from 'titleize';

type BooleanInputProps<
  TRecipe,
  TEntry extends keyof SubType<TRecipe, boolean>
> = InputProps<boolean, TRecipe, TEntry>;

export function FrontUiExperimentTabBooleanInput<
  TRecipe,
  TEntry extends keyof SubType<TRecipe, boolean>
>(props: BooleanInputProps<TRecipe, TEntry>) {
  return (
    <FormControlLabel
      control={
        <Switch
          checked={!!props.parentRecipeFormProps.recipe[props.entry]}
          onChange={(e) => {
            const newRecipe = Object.assign(
              new props.parentRecipeFormProps.allocator(),
              props.parentRecipeFormProps.recipe
            );
            newRecipe[props.entry] = e.target
              .checked as unknown as TRecipe[TRecipe[TEntry] extends boolean
              ? TEntry
              : never];
            props.parentRecipeFormProps.onChange(newRecipe);
          }}
        />
      }
      label={props.label || titleize(humanizeString(`${props.entry}`))}
    />
  );
}

export default FrontUiExperimentTabBooleanInput;
export { FrontUiExperimentTabBooleanInput as BooleanInput };
