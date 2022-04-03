import { render } from '@testing-library/react';

import ExperimentsApplyCurrentKeithley6221 from './experiments-apply-current-keithley-6221';

describe('ExperimentsApplyCurrentKeithley6221', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExperimentsApplyCurrentKeithley6221 />);
    expect(baseElement).toBeTruthy();
  });
});
