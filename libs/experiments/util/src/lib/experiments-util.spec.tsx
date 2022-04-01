import { render } from '@testing-library/react';

import ExperimentsUtil from './experiments-util';

describe('ExperimentsUtil', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExperimentsUtil />);
    expect(baseElement).toBeTruthy();
  });
});
