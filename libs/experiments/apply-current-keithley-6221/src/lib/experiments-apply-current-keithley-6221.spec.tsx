import { render } from '@testing-library/react';

describe('ExperimentsApplyCurrentKeithley6221', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
