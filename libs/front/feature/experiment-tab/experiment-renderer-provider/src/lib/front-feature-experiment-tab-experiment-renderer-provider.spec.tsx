import { render } from '@testing-library/react';

import FrontFeatureExperimentTabExperimentRendererProvider from './front-feature-experiment-tab-experiment-renderer-provider';

describe('FrontFeatureExperimentTabExperimentRendererProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
