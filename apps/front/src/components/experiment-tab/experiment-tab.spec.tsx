import { render } from '@testing-library/react';

import { ExperimentTab } from './experiment-tab';

describe('ExperimentTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExperimentTab />);
    expect(baseElement).toBeTruthy();
  });
});
