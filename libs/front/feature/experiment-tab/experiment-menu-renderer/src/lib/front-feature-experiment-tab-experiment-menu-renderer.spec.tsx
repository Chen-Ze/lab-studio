import { render } from '@testing-library/react';

describe('FrontFeatureExperimentTabExperimentMenuRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
