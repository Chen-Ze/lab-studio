import { render } from '@testing-library/react';

import ExperimentsRoot from './experiments-root';

describe('ExperimentsRoot', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ExperimentsRoot />);
    expect(baseElement).toBeTruthy();
  });
});
