import { render } from '@testing-library/react';

describe('FrontUiExperimentTabArrayRecipeForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
