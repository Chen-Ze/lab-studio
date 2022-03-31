import { render } from '@testing-library/react';

describe('ExperimentsPrint', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
