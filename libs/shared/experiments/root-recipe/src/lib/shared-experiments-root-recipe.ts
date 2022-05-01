import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import { Type } from 'class-transformer';
import * as R from 'ramda';

export class OpenInstrumentRecipe {
  name = '';
  address = '';
  model = '';
}

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
