import { render } from '@testing-library/react';

import FrontFeatureExperimentTabDetailedRenderers from './front-feature-experiment-tab-detailed-renderers';

describe('FrontFeatureExperimentTabDetailedRenderers', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <FrontFeatureExperimentTabDetailedRenderers />
    );
    expect(baseElement).toBeTruthy();
  });
});
