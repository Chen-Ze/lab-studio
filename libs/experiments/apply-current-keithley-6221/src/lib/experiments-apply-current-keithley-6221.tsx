import { makeExperimentRenderer } from '@lab-studio/experiments/util';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';
import { ReactComponent as CurrentSourceIcon } from '../assets/current-source.svg';
import {
  ExperimentScope,
  InstrumentName,
} from '@lab-studio/shared/data/recipe/experiment-scope';
import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';
import styled from 'styled-components';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { makeArrayRecipeInput } from '@lab-studio/front/ui/experiment-tab/array-recipe-form';
import { Type } from 'class-transformer';
import { Typography } from '@mui/material';
import { InstrumentInput } from '@lab-studio/front/ui/experiment-tab/instrument-input';
import { nanoid } from '@reduxjs/toolkit';
import { RecipeWithOutput } from '@lab-studio/api/experiment/experiment-worker';

class CurrentPieceRecipe {
  _id = nanoid();
  start = 0;
  stop = 1e-4;

  private _step = 1e-5;

  public get step() {
    return this._step;
  }
  public set step(value) {
    if (this.step === this.delta) this._delta = value;
    this._step = value;
  }

  private _delta = 1e-5;

  public get delta() {
    return this._delta;
  }
  public set delta(value) {
    if (this.step === this.delta) this._step = value;
    this._delta = value;
  }
}

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

export class ApplyCurrentKeithley6221Recipe implements RecipeWithOutput {
  @Type(() => CurrentPieceRecipe)
  currentPieces: CurrentPieceRecipe[] = [];

  instrumentName: InstrumentName = '';

  output() {
    return {
      innerOutputList: {
        Current: {
          type: RecipeOutputTypes.Number,
          declare: 'j',
        },
      },
      outerOutputList: {
        'All Currents': {
          type: RecipeOutputTypes.NumberArray,
          declare: 'J',
        },
      },
    };
  }

  info(
    environment?: ExperimentScope
  ): RecipeInfo<ApplyCurrentKeithley6221Recipe> {
    return {};
  }
}

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
