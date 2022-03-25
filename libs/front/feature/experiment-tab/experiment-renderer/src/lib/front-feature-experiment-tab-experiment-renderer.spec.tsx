import 'reflect-metadata';
import { render } from '@testing-library/react';
import { JSXElementConstructor } from 'react';

import {
  renderType,
  shouldRender,
  ExperimentRenderer,
  ExperimentRendererPropsTyped,
} from './front-feature-experiment-tab-experiment-renderer';

const foo: ExperimentRendererPropsTyped<
  Record<string, unknown>,
  Record<string, unknown>
> = {
  typedInput: {
    inputData: { _type: 'Foo', data: {} },
    environmentData: {},
  },
  onChange: () => {
    /* Do nothing */
  },
};

@renderType('Foo')
class FooRenderer
  implements
    ExperimentRenderer<Record<string, unknown>, Record<string, unknown>>
{
  render(props: unknown) {
    return <div></div>;
  }
}

describe('FrontFeatureExperimentTabExperimentRenderer', () => {
  it('should render successfully', () => {
    const renderer = new FooRenderer();
    expect(shouldRender(renderer, foo)).toBe(true);
  });
});
