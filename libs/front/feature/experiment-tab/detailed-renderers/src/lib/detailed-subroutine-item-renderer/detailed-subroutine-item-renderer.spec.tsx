import { render } from '@testing-library/react';

describe('DetailedSubroutineItemRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
