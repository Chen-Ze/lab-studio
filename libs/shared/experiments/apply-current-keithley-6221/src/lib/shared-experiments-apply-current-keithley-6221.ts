import { nanoid } from '@reduxjs/toolkit';
import {
  ExperimentScope,
  InstrumentName,
} from '@lab-studio/shared/data/recipe/experiment-scope';
import { RecipeInfo } from '@lab-studio/shared/data/recipe/recipe';
import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';
import { Type } from 'class-transformer';
import { RecipeWithOutput } from '@lab-studio/api/experiment/experiment-worker';

export class CurrentPieceRecipe {
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
