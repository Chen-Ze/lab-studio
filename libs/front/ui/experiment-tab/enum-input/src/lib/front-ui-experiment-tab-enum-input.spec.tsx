import { render } from '@testing-library/react';

import FrontUiExperimentTabEnumInput from './front-ui-experiment-tab-enum-input';

enum ChannelMode {
  SweepCurrent = 'Sweep Current',
  SweepVoltage = 'Sweep Voltage',
  FixedCurrent = 'Fixed Current',
  FixedVoltage = 'Fixed Voltage',
}

class ChannelRecipe {
  mode = ChannelMode.FixedVoltage;
}

describe('FrontUiExperimentTabEnumInput', () => {
  it('should render successfully', () => {
    const recipe = new ChannelRecipe();
    const { baseElement } = render(
      <FrontUiExperimentTabEnumInput
        parentRecipeFormProps={{
          recipe,
          allocator: ChannelRecipe,
          onChange: () => {
            /* Do nothing */
          },
        }}
        entry="mode"
        enumObject={ChannelMode}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
