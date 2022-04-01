import { InputProps } from '@lab-studio/front/ui/experiment-tab/input-props';
import {
  InstrumentName,
  InstrumentModel,
} from '@lab-studio/shared/data/recipe/experiment-scope';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import humanizeString from 'humanize-string';
import titleize from 'titleize';
import { PickByValueExact } from 'utility-types';
import * as R from 'ramda';

interface InstrumentInputProps<
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, InstrumentName>
> extends InputProps<InstrumentName, TRecipe, TEntry> {
  model: InstrumentModel;
}

export function FrontUiExperimentTabInstrumentInput<
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, InstrumentName>
>(props: InstrumentInputProps<TRecipe, TEntry>) {
  return (
    <FormControl variant="standard" sx={{ m: 1, width: props.width || '25ch' }}>
      <InputLabel>
        {props.label || titleize(humanizeString(String(props.entry)))}
      </InputLabel>
      <Select
        label={props.label || titleize(humanizeString(String(props.entry)))}
        value={props.parentRecipeFormProps.recipe[props.entry]}
        onChange={(e) => {
          const newRecipe = Object.assign(
            new props.parentRecipeFormProps.allocator(),
            props.parentRecipeFormProps.recipe
          );
          newRecipe[props.entry] = e.target
            .value as unknown as TRecipe[TRecipe[TEntry] extends InstrumentName
            ? TEntry
            : never];
          props.parentRecipeFormProps.onChange(newRecipe);
        }}
      >
        <MenuItem key={''} value={''}>
          <em>None</em>
        </MenuItem>
        {Object.keys(
          R.filter(
            R.equals(props.model),
            props.parentRecipeFormProps.scope.instruments
          )
        ).map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FrontUiExperimentTabInstrumentInput;
export { FrontUiExperimentTabInstrumentInput as InstrumentInput };
