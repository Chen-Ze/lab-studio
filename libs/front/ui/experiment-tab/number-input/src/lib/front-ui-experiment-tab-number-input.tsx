import { InputProps } from '@lab-studio/front/ui/experiment-tab/input-props';
import { SubType } from '@lab-studio/shared/util/types';
import { InputAdornment, TextField, Typography } from '@mui/material';
import humanizeString from 'humanize-string';
import isNumber from 'is-number';
import { useObservableCallback, useSubscription } from 'observable-hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { debounceTime, filter, pluck } from 'rxjs';
import titleize from 'titleize';
import { PickByValue, PickByValueExact } from 'utility-types';

type NumberInputProps<
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, number>
> = InputProps<number, TRecipe, TEntry>;

const DEBOUNCE = 500;

export function FrontUiExperimentTabNumberInput<
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, number>
>(props: NumberInputProps<TRecipe, TEntry>) {
  const [value, setValue] = useState(
    props.parentRecipeFormProps.recipe[props.entry]
  );
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    setValue(props.parentRecipeFormProps.recipe[props.entry]);
    setEditing(false);
  }, [props.parentRecipeFormProps.recipe, props.entry]);

  const [onChange, textChange$] = useObservableCallback<
    string,
    ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  >((event$) =>
    event$.pipe(
      pluck('currentTarget', 'value'),
      debounceTime(DEBOUNCE),
      filter(isNumber)
    )
  );

  useSubscription(textChange$, (value) => {
    const newRecipe = Object.assign(
      new props.parentRecipeFormProps.allocator(),
      props.parentRecipeFormProps.recipe
    );
    newRecipe[props.entry] = +value as unknown as TRecipe[TEntry];
    props.parentRecipeFormProps.onChange(newRecipe);
  });

  return (
    <TextField
      helperText={
        // eslint-disable-next-line
        // @ts-ignore
        props.parentRecipeFormProps.recipeInfo?.[props.entry]?.errorMessage
      }
      color={editing ? 'error' : undefined}
      variant="standard"
      sx={{ m: 1, width: props.width || '25ch' }}
      label={props.label || titleize(humanizeString(String(props.entry)))}
      value={value}
      onChange={(e) => {
        setEditing(true);
        // eslint-disable-next-line
        // @ts-ignore
        setValue(e.currentTarget.value);
        onChange(e);
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

export default FrontUiExperimentTabNumberInput;
export { FrontUiExperimentTabNumberInput as NumberInput };
