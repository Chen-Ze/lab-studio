import { InputProps } from '@lab-studio/front/ui/experiment-tab/input-props';
import { InputAdornment, TextField, Typography } from '@mui/material';
import humanizeString from 'humanize-string';
import titleize from 'titleize';
import { PickByValueExact } from 'utility-types';

type StringInputProps<
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, string>
> = InputProps<string, TRecipe, TEntry>;

export function FrontUiExperimentTabStringInput<
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, string>
>(props: StringInputProps<TRecipe, TEntry>) {
  return (
    <TextField
      helperText={
        // eslint-disable-next-line
        // @ts-ignore
        props.parentRecipeFormProps.recipeInfo?.[props.entry]?.errorMessage
      }
      variant="standard"
      sx={{ m: 1, width: props.width || '25ch' }}
      label={props.label || titleize(humanizeString(String(props.entry)))}
      value={props.parentRecipeFormProps.recipe[props.entry]}
      onChange={(e) => {
        const newRecipe = Object.assign(
          new props.parentRecipeFormProps.allocator(),
          props.parentRecipeFormProps.recipe
        );
        newRecipe[props.entry] = e.target
          .value as unknown as TRecipe[TRecipe[TEntry] extends string
          ? TEntry
          : never];
        props.parentRecipeFormProps.onChange(newRecipe);
      }}
      InputProps={{
        sx: { fontFamily: 'monospace' },
        endAdornment: props.postfix && (
          <InputAdornment position="end">
            <Typography sx={{ fontFamily: 'monospace' }}>
              {props.postfix}
            </Typography>
          </InputAdornment>
        ),
      }}
      aria-describedby="standard-weight-helper-text"
      inputProps={{
        'aria-label': props.label || String(props.entry),
      }}
    />
  );
}

export default FrontUiExperimentTabStringInput;
export { FrontUiExperimentTabStringInput as StringInput };
