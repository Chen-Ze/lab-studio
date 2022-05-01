import {
  defaultInputForType,
  ExperimentDefaultInputProvider,
} from '@lab-studio/front/feature/experiment-tab/experiment-default-input-provider';
import {
  renderType,
  ExperimentRenderer,
  ExperimentRendererProps,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import { makeArrayRecipeInput } from '@lab-studio/front/ui/experiment-tab/array-recipe-form';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { StringInput } from '@lab-studio/front/ui/experiment-tab/string-input';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import {
  ExperimentMeasurement,
  PlainifiedRecipe,
} from '@lab-studio/shared/data/recipe/recipe';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { instanceToPlain, Type } from 'class-transformer';
import { injectable } from 'inversify';
import * as R from 'ramda';

class OpenInstrumentRecipe {
  name = '';
  address = '';
  model = '';
}

function OpenInstrumentRecipeForm(
  props: RecipeFormProps<OpenInstrumentRecipe>
) {
  return (
    <Box
      sx={{
        display: 'flex',
        '& > div': { marginX: 1 },
        marginBottom: 1,
        alignItems: 'center',
      }}
    >
      <StringInput parentRecipeFormProps={props} entry="name" />
      <FormControl sx={{ width: '15ch' }}>
        <InputLabel>Address</InputLabel>
        <Select
          variant="standard"
          value={props.recipe.address}
          label="Address"
          onChange={(e) => {
            props.onChange({
              ...props.recipe,
              address: e.target.value,
            });
          }}
          sx={{
            fontFamily: 'monospace',
          }}
        >
          <MenuItem value={''}>
            <em>None</em>
          </MenuItem>
          {props.scope.addresses.map((name) => (
            <MenuItem sx={{ fontFamily: 'monospace' }} key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <StringInput parentRecipeFormProps={props} entry="model" />
    </Box>
  );
}

const ArrayOpenInstrumentRecipeInput = makeArrayRecipeInput(
  OpenInstrumentRecipeForm,
  OpenInstrumentRecipe
);

export class RootRecipe {
  dataPath = '';

  @Type(() => OpenInstrumentRecipe)
  instruments: OpenInstrumentRecipe[] = [];

  output(): RecipeOutput {
    return {
      instrumentList: R.zipObj(
        R.pluck('name', this.instruments),
        R.pluck('model', this.instruments)
      ),
      innerOutputList: {
        'Starting Time': {
          type: RecipeOutputTypes.Number,
        },
        'Current Time': {
          type: RecipeOutputTypes.Number,
        },
      },
      outerOutputList: {},
    };
  }
}

function RootForm(props: RecipeFormProps<RootRecipe>) {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <StringInput parentRecipeFormProps={props} entry="dataPath" />
      <Typography variant="body2" sx={{ textAlign: 'center', marginY: 1 }}>
        Instruments
      </Typography>
      <ArrayOpenInstrumentRecipeInput
        parentRecipeFormProps={props}
        entry="instruments"
      />
    </Box>
  );
}

const RootExperiment = makeExperiment(RootForm, RootRecipe, (recipe) =>
  recipe.output()
);

@injectable()
@renderType('Root')
@defaultInputForType('Root')
export class RootRenderer
  implements
    ExperimentRenderer<ExperimentMeasurement<RootRecipe>, ExperimentScope>,
    ExperimentDefaultInputProvider<ExperimentMeasurement<RootRecipe>>
{
  render(
    props: ExperimentRendererProps<
      ExperimentMeasurement<RootRecipe>,
      ExperimentScope
    >
  ) {
    return (
      <RootExperiment
        experimentMeasurement={props.inputData}
        scope={props.environmentData}
        onChange={props.onChange}
      />
    );
  }

  defaultInput(): ExperimentMeasurement<RootRecipe> {
    return {
      plainifiedRecipe: instanceToPlain(
        new RootRecipe()
      ) as PlainifiedRecipe<RootRecipe>,
      recipeOutput: new RootRecipe().output(),
    };
  }
}
