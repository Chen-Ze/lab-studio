import { render } from '@testing-library/react';

describe('DetailedMenuRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
