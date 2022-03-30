import { render } from '@testing-library/react';

import DetailedFallbackExperimentRenderer from './detailed-fallback-experiment-renderer';

describe('DetailedFallbackExperimentRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DetailedFallbackExperimentRenderer />);
    expect(baseElement).toBeTruthy();
  });
});
