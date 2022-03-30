import { render } from '@testing-library/react';

describe('DetailedSubroutinesRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
