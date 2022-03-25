import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';
import { render } from '@testing-library/react';

import FrontUiExperimentTabRecipeOutputForm from './front-ui-experiment-tab-recipe-output-form';

describe('FrontUiExperimentTabRecipeOutputForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FrontUiExperimentTabRecipeOutputForm
        columns={['ia', 'ib', 'va', 'vb']}
        output={{
          innerOutputList: {
            'Channel A Current': { type: RecipeOutputTypes.Number },
            'Channel A Voltage': { type: RecipeOutputTypes.Number },
            'Channel B Current': { type: RecipeOutputTypes.Number },
            'Channel B Voltage': { type: RecipeOutputTypes.Number },
          },
          outerOutputList: {
            'All Channel A Currents': { type: RecipeOutputTypes.NumberArray },
            'All Channel A Voltages': { type: RecipeOutputTypes.NumberArray },
            'All Channel B Currents': { type: RecipeOutputTypes.NumberArray },
            'All Channel B Voltages': { type: RecipeOutputTypes.NumberArray },
          },
        }}
        onChange={() => {
          /* Do nothing */
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
