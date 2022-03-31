import { makeExperimentRenderer } from '@lab-studio/experiments/util';
import { makeArrayRecipeInput } from '@lab-studio/front/ui/experiment-tab/array-recipe-form';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { RecipeOutput } from '@lab-studio/shared/data/recipe/recipe-output';
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Type } from 'class-transformer';
import { ReactComponent as TableIcon } from '../assets/table.svg';

class PrintEntryRecipe {
  variableName = '';
  column = '';
}

function PrintEntryRecipeForm(props: RecipeFormProps<PrintEntryRecipe>) {
  return (
    <Box sx={{ display: 'flex', '& > div': { marginX: 1 }, marginBottom: 1 }}>
      <FormControl sx={{ width: '15ch' }} size="small">
        <InputLabel>Variable</InputLabel>
        <Select
          value={props.recipe.variableName}
          label="Variable"
          onChange={(e) => {
            props.onChange({
              ...props.recipe,
              variableName: e.target.value,
            });
          }}
          sx={{
            fontFamily: 'monospace',
          }}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          {Object.keys(props.scope.variables).map((name) => (
            <MenuItem sx={{ fontFamily: 'monospace' }} key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Autocomplete
        freeSolo
        inputValue={props.recipe.column}
        onInputChange={(event, newInputValue) => {
          props.onChange({
            ...props.recipe,
            column: newInputValue,
          });
        }}
        options={props.scope.columns}
        renderOption={(props, option) => (
          <Box component="li" {...props} sx={{ fontFamily: 'monospace' }}>
            {option}
          </Box>
        )}
        sx={{ width: '15ch' }}
        renderInput={(params) => (
          <TextField
            label="Column"
            {...params}
            size="small"
            inputProps={{
              ...params.inputProps,
              sx: {
                fontFamily: 'monospace',
              },
            }}
          />
        )}
      />
    </Box>
  );
}

const ArrayPrintEntryRecipeInput = makeArrayRecipeInput(
  PrintEntryRecipeForm,
  PrintEntryRecipe
);

class PrintRecipe {
  @Type(() => PrintEntryRecipe)
  entries: PrintEntryRecipe[] = [];

  output(): RecipeOutput {
    return {
      innerOutputList: {},
      outerOutputList: {},
    };
  }
}

function PrintForm(props: RecipeFormProps<PrintRecipe>) {
  return (
    <ArrayPrintEntryRecipeInput parentRecipeFormProps={props} entry="entries" />
  );
}

const PrintExperiment = makeExperiment(PrintForm, PrintRecipe, (recipe) =>
  recipe.output()
);

export const PrintRenderer = makeExperimentRenderer(
  PrintRecipe,
  PrintExperiment,
  <TableIcon style={{ width: 60 }} />,
  'Print'
);
