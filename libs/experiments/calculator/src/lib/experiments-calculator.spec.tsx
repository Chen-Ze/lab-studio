import { render } from '@testing-library/react';

describe('ExperimentsCalculator', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
