import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';
import {
  EnvironmentReducer,
  EnvironmentReducerFallback,
} from './front-feature-experiment-tab-scope-environment-reducer';

describe('frontFeatureExperimentTabScopeEnvironmentReducer', () => {
  const recipeOutput: ExperimentMeasurement<unknown> = {
    plainifiedRecipe: {} as never,
    recipeOutput: {
      instrumentList: {
        Bias: 'keithley-2600',
        Shadow: 'newShadow',
      },
      innerOutputList: {
        iNewVar: {
          type: RecipeOutputTypes.Number,
          declare: 'iNV',
        },
        iShadowVar: {
          type: RecipeOutputTypes.Number,
          declare: 'iSV',
        },
        iShadowVarNewType: {
          type: RecipeOutputTypes.NumberArray,
          declare: 'iSVNT',
        },
        iNoDeclare: {
          type: RecipeOutputTypes.Number,
        },
      },
      outerOutputList: {
        oNewVar: {
          type: RecipeOutputTypes.Number,
          declare: 'oNV',
        },
        oShadowVar: {
          type: RecipeOutputTypes.Number,
          declare: 'oSV',
        },
        oShadowVarNewType: {
          type: RecipeOutputTypes.NumberArray,
          declare: 'oSVNT',
        },
        oNoDeclare: {
          type: RecipeOutputTypes.Number,
        },
      },
    },
  };

  const oldEnvironment = {
    variables: {
      iSV: RecipeOutputTypes.Number,
      oSV: RecipeOutputTypes.Number,
      iSVNT: RecipeOutputTypes.Number,
      oSVNT: RecipeOutputTypes.Number,
    },
    columns: ['ia', 'ib', 'va', 'vb'],
    instruments: {
      Gate: 'keithley-2400',
      Shadow: 'oldShadow',
    },
    addresses: [],
  };

  it('should merge the new recipe output into the environment', () => {
    const environmentReducer = new EnvironmentReducer();

    expect(environmentReducer.reduce(recipeOutput, oldEnvironment)).toEqual<{
      innerEnvironment: ExperimentScope;
      outerEnvironment: ExperimentScope;
    }>({
      innerEnvironment: {
        variables: {
          iSV: RecipeOutputTypes.Number,
          oSV: RecipeOutputTypes.Number,
          iSVNT: RecipeOutputTypes.NumberArray,
          oSVNT: RecipeOutputTypes.Number,
          iNV: RecipeOutputTypes.Number,
        },
        columns: ['ia', 'ib', 'va', 'vb'],
        instruments: {
          Gate: 'keithley-2400',
          Bias: 'keithley-2600',
          Shadow: 'newShadow',
        },
        addresses: [],
      },
      outerEnvironment: {
        variables: {
          iSV: RecipeOutputTypes.Number,
          oSV: RecipeOutputTypes.Number,
          iSVNT: RecipeOutputTypes.Number,
          oSVNT: RecipeOutputTypes.NumberArray,
          oNV: RecipeOutputTypes.Number,
        },
        columns: ['ia', 'ib', 'va', 'vb'],
        instruments: {
          Gate: 'keithley-2400',
          Bias: 'keithley-2600',
          Shadow: 'newShadow',
        },
        addresses: [],
      },
    });
  });

  it('should return the old environment when fallback is called', () => {
    const environmentReducer = new EnvironmentReducerFallback();

    expect(environmentReducer.reduce(recipeOutput, oldEnvironment)).toEqual<{
      innerEnvironment: ExperimentScope;
      outerEnvironment: ExperimentScope;
    }>({
      innerEnvironment: oldEnvironment,
      outerEnvironment: oldEnvironment,
    });
  });
});
