import { render } from '@testing-library/react';

import FrontUiExperimentTabBooleanInput from './front-ui-experiment-tab-boolean-input';

describe('FrontUiExperimentTabBooleanInput', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontUiExperimentTabBooleanInput />);
    expect(baseElement).toBeTruthy();
  });
});
