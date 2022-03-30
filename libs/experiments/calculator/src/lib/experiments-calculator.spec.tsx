import { render } from '@testing-library/react';

import ExperimentsCalculator from './experiments-calculator';

describe('ExperimentsCalculator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExperimentsCalculator />);
    expect(baseElement).toBeTruthy();
  });
});
