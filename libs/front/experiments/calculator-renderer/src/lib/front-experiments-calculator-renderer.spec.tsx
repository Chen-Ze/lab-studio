import { render } from '@testing-library/react';

import FrontExperimentsCalculatorRenderer from './front-experiments-calculator-renderer';

describe('FrontExperimentsCalculatorRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontExperimentsCalculatorRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
