import { render } from '@testing-library/react';

import FrontExperimentsApplyCurrentKeithley6221Renderer from './front-experiments-apply-current-keithley-6221-renderer';

describe('FrontExperimentsApplyCurrentKeithley6221Renderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FrontExperimentsApplyCurrentKeithley6221Renderer />
    );
    expect(baseElement).toBeTruthy();
  });
});
