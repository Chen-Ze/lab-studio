import { makeRecipeSlice } from './front-feature-experiment-tab-slice';

class Recipe {
  value = 0;
}

describe('frontFeatureExperimentTabSlice', () => {
  it('should work', () => {
    const slice = makeRecipeSlice(Recipe, 'RECIPE');
    expect(slice).toBeTruthy();
  });
});
