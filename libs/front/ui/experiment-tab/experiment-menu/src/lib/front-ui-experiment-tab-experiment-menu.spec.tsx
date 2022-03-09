import { render } from '@testing-library/react';

import FrontUiExperimentTabExperimentMenu from './front-ui-experiment-tab-experiment-menu';

describe('FrontUiExperimentTabExperimentMenu', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontUiExperimentTabExperimentMenu />);
    expect(baseElement).toBeTruthy();
  });
});
