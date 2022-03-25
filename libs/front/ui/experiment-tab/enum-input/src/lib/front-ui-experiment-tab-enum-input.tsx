import { InputProps } from '@lab-studio/front/ui/experiment-tab/input-props';
import { SubType } from '@lab-studio/shared/util/types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import humanizeString from 'humanize-string';
import titleize from 'titleize';
import { PickByValueExact } from 'utility-types';

interface EnumInputProps<
  TEnum extends string,
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, TEnum>
> extends InputProps<TEnum, TRecipe, TEntry> {
  enumObject: {
    [key: string]: TEnum;
  };
}

export function FrontUiExperimentTabEnumInput<
  TEnum extends string,
  TRecipe,
  TEntry extends keyof PickByValueExact<TRecipe, TEnum>
>(props: EnumInputProps<TEnum, TRecipe, TEntry>) {
  return (
    <FormControl variant="standard" sx={{ m: 1, width: props.width || '25ch' }}>
      <InputLabel>
        {props.label || titleize(humanizeString(`${props.entry}`))}
      </InputLabel>
      <Select
        label={props.label || titleize(humanizeString(`${props.entry}`))}
        value={props.parentRecipeFormProps.recipe[props.entry]}
        onChange={(e) => {
          const newRecipe = Object.assign(
            new props.parentRecipeFormProps.allocator(),
            props.parentRecipeFormProps.recipe
          );
          newRecipe[props.entry] = e.target
            .value as unknown as TRecipe[TRecipe[TEntry] extends TEnum
            ? TEntry
            : never];
          props.parentRecipeFormProps.onChange(newRecipe);
        }}
      >
        {Object.keys(props.enumObject).map((key) => (
          <MenuItem key={key} value={props.enumObject[key]}>
            {props.enumObject[key]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FrontUiExperimentTabEnumInput;
export { FrontUiExperimentTabEnumInput as EnumInput };
