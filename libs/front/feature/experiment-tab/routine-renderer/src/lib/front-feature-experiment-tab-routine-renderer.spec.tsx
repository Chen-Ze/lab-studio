import { render } from '@testing-library/react';

describe('FrontFeatureExperimentTabRoutineRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
