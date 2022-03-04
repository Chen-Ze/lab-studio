import { render } from '@testing-library/react';

import FrontUiExperimentTabNumberInput from './front-ui-experiment-tab-number-input';

class Recipe {
  value = 0;
}

describe('FrontUiExperimentTabNumberInput', () => {
  it('should render successfully', () => {
    const recipe = new Recipe();
    const { baseElement } = render(
      <FrontUiExperimentTabNumberInput
        parentRecipeFormProps={{
          recipe,
          allocator: Recipe,
          onChange: () => {
            /* Do nothing */
          },
        }}
        entry="value"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
