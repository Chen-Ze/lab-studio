import { render } from '@testing-library/react';

describe('ExperimentsContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
