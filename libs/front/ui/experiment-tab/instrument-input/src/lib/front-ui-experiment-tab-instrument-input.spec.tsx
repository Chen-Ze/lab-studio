import { render } from '@testing-library/react';

import FrontUiExperimentTabInstrumentInput from './front-ui-experiment-tab-instrument-input';

describe('FrontUiExperimentTabInstrumentInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontUiExperimentTabInstrumentInput />);
    expect(baseElement).toBeTruthy();
  });
});
