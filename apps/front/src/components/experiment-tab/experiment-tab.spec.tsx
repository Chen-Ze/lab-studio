import 'reflect-metadata';
import { render } from '@testing-library/react';

describe('ExperimentTab', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<div />);
    expect(baseElement).toBeTruthy();
  });
});
