import {
  ExperimentRenderer,
  ExperimentRendererProps,
  ExperimentRendererPropsTyped,
  renderType,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import { Meta, Story } from '@storybook/react';
import { Container, injectable } from 'inversify';
import 'reflect-metadata';
import { EXPERIMENT_RENDERER_TYPES } from './experiment-renderer-types';
import { ExperimentRendererProvider } from './front-feature-experiment-tab-experiment-renderer-provider';

interface FooExperimentRendererProps {
  value: number;
}

@injectable()
@renderType('Foo')
class FooExperimentRenderer
  implements
    ExperimentRenderer<FooExperimentRendererProps, Record<string, unknown>>
{
  render({
    inputData,
  }: ExperimentRendererProps<
    FooExperimentRendererProps,
    Record<string, unknown>
  >) {
    return <div>Value plus one is {inputData.value + 1}</div>;
  }
}

interface BarExperimentRendererProps {
  value: string;
}

@injectable()
@renderType('Bar')
class BarExperimentRenderer
  implements
    ExperimentRenderer<BarExperimentRendererProps, Record<string, unknown>>
{
  render({
    inputData,
  }: ExperimentRendererProps<
    BarExperimentRendererProps,
    Record<string, unknown>
  >) {
    return <div>String length is {inputData.value.length}</div>;
  }
}

@injectable()
class UnknownExperimentRenderer
  implements ExperimentRenderer<unknown, unknown>
{
  render(props: unknown) {
    return <div>Unknown props {JSON.stringify(props)}</div>;
  }
}

const experimentContainer = new Container();
experimentContainer
  .bind<ExperimentRendererProvider>(
    EXPERIMENT_RENDERER_TYPES.ExperimentRendererProvider
  )
  .to(ExperimentRendererProvider);
experimentContainer
  .bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer)
  .to(FooExperimentRenderer);
experimentContainer
  .bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer)
  .to(BarExperimentRenderer);
experimentContainer
  .bind(EXPERIMENT_RENDERER_TYPES.ExperimentRendererFallback)
  .to(UnknownExperimentRenderer);

interface ExperimentListProps {
  array: ExperimentRendererPropsTyped<unknown, unknown>[];
}

function ExperimentList(props: ExperimentListProps) {
  return (
    <div>
      {props.array.map((rendererProps, i) => (
        <div key={i}>
          {experimentContainer
            .get<ExperimentRendererProvider>(
              EXPERIMENT_RENDERER_TYPES.ExperimentRendererProvider
            )
            .render(rendererProps)}
        </div>
      ))}
    </div>
  );
}

export default {
  component: ExperimentList,
  title: 'ExperimentList',
} as Meta;

const Template: Story<ExperimentListProps> = (args) => (
  <ExperimentList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  array: [
    {
      typedInput: {
        inputData: {
          _type: 'Foo',
          data: {
            value: 42,
          },
        },
        environmentData: {},
      },
      onChange: () => {
        /* Do nothing */
      },
    },
    {
      typedInput: {
        inputData: {
          _type: 'Bar',
          data: {
            value: 'BarBarBar',
          },
        },
        environmentData: {},
      },
      onChange: () => {
        /* Do nothing */
      },
    },
    {
      typedInput: {
        inputData: {
          _type: 'Unknown',
          data: {
            value: NaN,
          },
        },
        environmentData: {},
      },
      onChange: () => {
        /* Do nothing */
      },
    },
  ],
};
