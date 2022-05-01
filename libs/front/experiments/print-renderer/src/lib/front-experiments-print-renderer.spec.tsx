import { render } from '@testing-library/react';

import FrontExperimentsPrintRenderer from './front-experiments-print-renderer';

describe('FrontExperimentsPrintRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontExperimentsPrintRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
