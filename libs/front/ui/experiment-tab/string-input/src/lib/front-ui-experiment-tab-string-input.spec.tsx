import { render } from '@testing-library/react';

import FrontUiExperimentTabStringInput from './front-ui-experiment-tab-string-input';

class Recipe {
  name = 'Alice';
}

describe('FrontUiExperimentTabStringInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FrontUiExperimentTabStringInput
        parentRecipeFormProps={{
          recipe: new Recipe(),
          allocator: Recipe,
          onChange: () => {
            /* Do nothing */
          },
        }}
        entry="name"
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
