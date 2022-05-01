import { render } from '@testing-library/react';

import FrontExperimentsRootRenderer from './front-experiments-root-renderer';

describe('FrontExperimentsRootRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FrontExperimentsRootRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
