import { render } from '@testing-library/react';

import FrontUiExperimentTabRecipeOutputForm from './front-ui-experiment-tab-recipe-output-form';

describe('FrontUiExperimentTabRecipeOutputForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FrontUiExperimentTabRecipeOutputForm
        columns={['ia', 'ib', 'va', 'vb']}
        output={{
          innerOutputList: {
            'Channel A Current': {},
            'Channel A Voltage': {},
            'Channel B Current': {},
            'Channel B Voltage': {},
          },
          outerOutputList: {
            'All Channel A Currents': {},
            'All Channel A Voltages': {},
            'All Channel B Currents': {},
            'All Channel B Voltages': {},
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
