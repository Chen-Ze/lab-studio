import { render } from '@testing-library/react';

import FrontExperimentsContainer from './front-experiments-container';

describe('FrontExperimentsContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontExperimentsContainer />);
    expect(baseElement).toBeTruthy();
  });
});
