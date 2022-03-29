import { RecipeOutput } from '@lab-studio/shared/data/recipe/recipe-output';
import {
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import produce from 'immer';

export interface FrontUiExperimentTabRecipeOutputFormProps {
  output: RecipeOutput;
  columns: string[];
  onChange: (newRecipeOutput: RecipeOutput) => void;
}

export function FrontUiExperimentTabRecipeOutputForm(
  props: FrontUiExperimentTabRecipeOutputFormProps
) {
  return (
    <TableContainer>
      <Table size="small" aria-label="recipe output table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Scope</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Declare</TableCell>
            <TableCell align="center">Write</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RecipeOutputListRows {...props} scope="innerOutputList" />
          <RecipeOutputListRows {...props} scope="outerOutputList" />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FrontUiExperimentTabRecipeOutputForm;
export { FrontUiExperimentTabRecipeOutputForm as RecipeOutputForm };

interface FrontUiExperimentTabRecipeOutputRowsProps
  extends FrontUiExperimentTabRecipeOutputFormProps {
  scope: 'innerOutputList' | 'outerOutputList';
}

function RecipeOutputListRows(
  props: FrontUiExperimentTabRecipeOutputRowsProps
) {
  return (
    <>
      {Object.keys(props.output[props.scope]).map((key) => (
        <TableRow
          key={key}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell align="center">
            {props.scope === 'innerOutputList' ? 'Private' : 'Public'}
          </TableCell>
          <TableCell align="center" component="th" scope="row">
            {key}
          </TableCell>
          <TableCell align="center">
            <FormControl sx={{ width: '15ch' }} size="small">
              <InputLabel>Variable</InputLabel>
              <OutlinedInput
                value={props.output[props.scope][key].declare || ''}
                size="small"
                label="Variable"
                inputProps={{
                  sx: {
                    fontFamily: 'monospace',
                  },
                }}
                onChange={(e) => {
                  props.onChange(
                    produce(props.output, (draft) => {
                      draft[props.scope][key].declare =
                        e.target.value || undefined;
                    })
                  );
                }}
              />
            </FormControl>
          </TableCell>
          <TableCell
            align="center"
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Autocomplete
              freeSolo
              inputValue={props.output[props.scope][key].write || ''}
              onInputChange={(event, newInputValue) => {
                props.onChange(
                  produce(props.output, (draft) => {
                    draft[props.scope][key].write = newInputValue || undefined;
                  })
                );
              }}
              options={[...props.columns]}
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
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
