import { render } from '@testing-library/react';

import FrontUiExperimentTabExperimentRoutine from './front-ui-experiment-tab-experiment-routine';

describe('FrontUiExperimentTabExperimentRoutine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontUiExperimentTabExperimentRoutine />);
    expect(baseElement).toBeTruthy();
  });
});
