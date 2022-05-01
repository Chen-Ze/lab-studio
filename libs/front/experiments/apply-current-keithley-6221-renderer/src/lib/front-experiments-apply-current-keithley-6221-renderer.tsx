import { makeExperimentRenderer } from '@lab-studio/experiments/util';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { ReactComponent as CurrentSourceIcon } from '../assets/current-source.svg';
import styled from 'styled-components';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { makeArrayRecipeInput } from '@lab-studio/front/ui/experiment-tab/array-recipe-form';
import { Typography } from '@mui/material';
import { InstrumentInput } from '@lab-studio/front/ui/experiment-tab/instrument-input';
import {
  CurrentPieceRecipe,
  ApplyCurrentKeithley6221Recipe,
} from '@lab-studio/shared/experiments/apply-current-keithley-6221';

const CurrentRecipeFormDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  place-content: center;
`;

function CurrentPieceForm(props: RecipeFormProps<CurrentPieceRecipe>) {
  return (
    <CurrentRecipeFormDiv>
      <NumberInput parentRecipeFormProps={props} entry="start" />
      <NumberInput parentRecipeFormProps={props} entry="stop" />
      <NumberInput parentRecipeFormProps={props} entry="step" />
      <NumberInput parentRecipeFormProps={props} entry="delta" />
    </CurrentRecipeFormDiv>
  );
}

const ArrayCurrentPieceInput = makeArrayRecipeInput(
  CurrentPieceForm,
  CurrentPieceRecipe,
  (recipe) => recipe._id
);

function ApplyCurrentKeithley6221Form(
  props: RecipeFormProps<ApplyCurrentKeithley6221Recipe>
) {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginBottom: 10,
          flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Apply Current (Keithley 6221)
        </Typography>
        <InstrumentInput
          parentRecipeFormProps={props}
          entry="instrumentName"
          model="Keithley 6221"
        />
      </div>
      <ArrayCurrentPieceInput
        parentRecipeFormProps={props}
        entry="currentPieces"
      />
    </div>
  );
}

const ApplyCurrentKeithley6221Experiment = makeExperiment(
  ApplyCurrentKeithley6221Form,
  ApplyCurrentKeithley6221Recipe,
  (recipe) => recipe.output(),
  (recipe, environment) => recipe.info(environment)
);

export const ApplyCurrentKeithley6221Renderer = makeExperimentRenderer(
  ApplyCurrentKeithley6221Recipe,
  ApplyCurrentKeithley6221Experiment,
  <CurrentSourceIcon style={{ width: 40 }} />,
  'Apply Current (Keithley 6221)'
);
