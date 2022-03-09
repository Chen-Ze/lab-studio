import { sharedDataRecipeExperimentScope } from './shared-data-recipe-experiment-scope';

describe('sharedDataRecipeExperimentScope', () => {
  it('should work', () => {
    expect(sharedDataRecipeExperimentScope()).toEqual(
      'shared-data-recipe-experiment-scope'
    );
  });
});
