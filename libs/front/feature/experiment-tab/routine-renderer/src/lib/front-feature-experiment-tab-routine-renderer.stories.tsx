import 'reflect-metadata';
import { ExperimentEnvironmentReducer } from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer';
import {
  ExperimentMenuItemRenderer,
  ExperimentMenuItemRendererProps,
  ExperimentMenuPanelRenderer,
  ExperimentMenuPanelRendererProps,
  ExperimentMenuRenderer,
  EXPERIMENT_MENU_RENDERER_TYPES,
  itemForType,
} from '@lab-studio/front/feature/experiment-tab/experiment-menu-renderer';
import {
  ExperimentRenderer,
  ExperimentRendererProps,
  renderType,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer';
import {
  ExperimentRendererProvider,
  EXPERIMENT_RENDERER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/experiment-renderer-provider';
import { nanoid } from '@reduxjs/toolkit';
import { Container, injectable } from 'inversify';
import * as R from 'ramda';
import {
  defaultInputForType,
  ExperimentDefaultInputProvider,
} from '@lab-studio/front/feature/experiment-tab/experiment-default-input-provider';
import { EXPERIMENT_ENVIRONMENT_REDUCER_TYPES } from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer-provider';
import { ExperimentEnvironmentReducerProvider } from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer-provider';
import {
  Routine,
  RoutineRenderer,
  RoutineService,
  SubroutineItemRenderer,
  SubroutineItemRendererProps,
  SubroutinesRenderer,
  SubroutinesRendererProps,
} from './front-feature-experiment-tab-routine-renderer';
import { ROUTINE_RENDERER_TYPES } from './routine-renderer-types';
import { Meta, Story } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Provider, useInjection } from 'inversify-react';

enum ValueType {
  Number = 'Number',
  NumberArray = 'NumberArray',
}

interface Environment {
  [key: string]: ValueType;
}

@injectable()
@renderType('Root')
class RootRenderer
  implements ExperimentRenderer<Record<string, unknown>, Environment>
{
  render(props: ExperimentRendererProps<Record<string, unknown>, Environment>) {
    return <div>Root</div>;
  }
}

interface PropsWithDeclaration {
  innerDeclarations: Environment;
  outerDeclarations: Environment;
}

interface FooProps extends PropsWithDeclaration {
  fooOuterName: string;
  fooOuterValue: string;
  fooInnerName: string;
  fooInnerValue: string;
}

function Foo(props: ExperimentRendererProps<FooProps, Environment>) {
  return (
    <div>
      Foo
      <div>
        Variables available in this scope:
        {Object.keys(props.environmentData)
          .map((key) => `${key}: ${props.environmentData[key]}`)
          .join(',')}
      </div>
      <div>
        Inner name
        <input
          value={props.inputData.fooInnerName}
          onChange={(e) => {
            props.onChange({
              ...props.inputData,
              fooInnerName: e.target.value,
              innerDeclarations: {
                [e.target.value]: ValueType.Number,
              },
            });
          }}
        />
        Inner value
        <input
          value={props.inputData.fooInnerValue}
          onChange={(e) => {
            props.onChange({
              ...props.inputData,
              fooInnerValue: e.target.value,
            });
          }}
        />
      </div>
      <div>
        Outer name
        <input
          value={props.inputData.fooOuterName}
          onChange={(e) => {
            props.onChange({
              ...props.inputData,
              fooOuterName: e.target.value,
              outerDeclarations: {
                [e.target.value]: ValueType.Number,
              },
            });
          }}
        />
        Outer value
        <input
          value={props.inputData.fooOuterValue}
          onChange={(e) => {
            props.onChange({
              ...props.inputData,
              fooOuterValue: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
}

@injectable()
@renderType('Foo')
@itemForType('Foo')
@defaultInputForType('Foo')
class FooRenderer
  implements
    ExperimentRenderer<FooProps, Environment>,
    ExperimentMenuItemRenderer,
    ExperimentDefaultInputProvider<FooProps>
{
  render(props: ExperimentRendererProps<FooProps, Environment>) {
    return <Foo {...props} />;
  }

  renderMenuItem(props: ExperimentMenuItemRendererProps) {
    return <input type="button" onClick={props.onAdd} value="Add Foo" />;
  }

  defaultInput(): FooProps {
    return {
      fooInnerName: 'someFooInnerName',
      fooOuterName: 'someFooOuterName',
      fooInnerValue: 'someFooInnerValue',
      fooOuterValue: 'someFooOuterValue',
      innerDeclarations: {},
      outerDeclarations: {},
    };
  }
}

interface BarProps extends PropsWithDeclaration {
  barName: string;
  barValue1: string;
  barValue2: string;
  barValue3: string;
}

function Bar(props: ExperimentRendererProps<BarProps, Environment>) {
  return (
    <div>
      Bar
      <div>
        Variables available in this scope:
        {Object.keys(props.environmentData)
          .map((key) => `${key}: ${props.environmentData[key]}`)
          .join(',')}
      </div>
      <div>
        Bar Name
        <div>
          <input
            value={props.inputData.barName}
            onChange={(e) => {
              props.onChange({
                ...props.inputData,
                barName: e.target.value,
                innerDeclarations: {
                  [e.target.value]: ValueType.Number,
                },
                outerDeclarations: {
                  [e.target.value]: ValueType.NumberArray,
                },
              });
            }}
          />
        </div>
      </div>
      <div>
        Bar Value 1
        <div>
          <input
            value={props.inputData.barValue1}
            onChange={(e) => {
              props.onChange({
                ...props.inputData,
                barValue1: e.target.value,
              });
            }}
          />
        </div>
      </div>
      <div>
        Bar Value 2
        <input
          value={props.inputData.barValue2}
          onChange={(e) => {
            props.onChange({
              ...props.inputData,
              barValue2: e.target.value,
            });
          }}
        />
      </div>
      <div>
        Bar Value 3
        <input
          value={props.inputData.barValue3}
          onChange={(e) => {
            props.onChange({
              ...props.inputData,
              barValue3: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
}

@injectable()
@renderType('Bar')
@itemForType('Bar')
@defaultInputForType('Bar')
class BarRenderer
  implements
    ExperimentRenderer<BarProps, Environment>,
    ExperimentMenuItemRenderer,
    ExperimentDefaultInputProvider<BarProps>
{
  render(props: ExperimentRendererProps<BarProps, Environment>) {
    return <Bar {...props} />;
  }

  renderMenuItem(props: ExperimentMenuItemRendererProps) {
    return <input type="button" onClick={props.onAdd} value="Add Bar" />;
  }

  defaultInput(): BarProps {
    return {
      barName: 'someBar',
      barValue1: 'someBarValue1',
      barValue2: 'someBarValue2',
      barValue3: 'someBarValue3',
      innerDeclarations: {},
      outerDeclarations: {},
    };
  }
}

@injectable()
class FallbackRenderer implements ExperimentRenderer<unknown, Environment> {
  render(props: ExperimentRendererProps<unknown, Environment>) {
    return (
      <div>
        Unknown input type
        {JSON.stringify(props)}
      </div>
    );
  }
}

@injectable()
class EnvironmentReducer
  implements ExperimentEnvironmentReducer<PropsWithDeclaration, Environment>
{
  reduce(input: PropsWithDeclaration, oldEnvironment: Environment) {
    return {
      innerEnvironment: R.mergeAll([oldEnvironment, input.innerDeclarations]),
      outerEnvironment: R.mergeAll([oldEnvironment, input.outerDeclarations]),
    };
  }
}

@injectable()
class EnvironmentReducerFallback
  implements ExperimentEnvironmentReducer<unknown, unknown>
{
  reduce(input: unknown, oldEnvironment: unknown) {
    return {
      innerEnvironment: oldEnvironment,
      outerEnvironment: oldEnvironment,
    };
  }
}

@injectable()
class SimpleSubroutineItemRenderer implements SubroutineItemRenderer {
  render(props: SubroutineItemRendererProps) {
    return (
      <div
        style={{
          border: 'thin solid red',
        }}
      >
        {props.children}
        <input type="button" onClick={props.onRemove} value="remove" />
      </div>
    );
  }
}

@injectable()
class SimpleSubroutinesRenderer implements SubroutinesRenderer {
  render(props: SubroutinesRendererProps) {
    return (
      <div>
        <div>{props.experiment}</div>
        <div>{props.menu}</div>
        <div
          style={{
            marginLeft: '10px',
          }}
        >
          {props.subroutines.map((subroutine) => (
            <div key={subroutine.key}>
              <subroutine.render />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

@injectable()
class SimpleMenuRenderer implements ExperimentMenuPanelRenderer {
  render(props: ExperimentMenuPanelRendererProps) {
    return (
      <div
        style={{
          border: 'solid thin black',
        }}
      >
        {props.childrenConstructors.map((ChildConstructor) => (
          <ChildConstructor
            onAdd={() => {
              /* Do nothing */
            }}
          />
        ))}
      </div>
    );
  }
}

@injectable()
class SimpleCRUD implements RoutineService<string> {
  routines: {
    [key: string]: Routine<unknown, string>;
  } = {
    Root: { input: { _type: 'Root', data: {} }, subroutines: [] },
  };

  add<TInput>(input: Routine<TInput, string>): string {
    const id = nanoid();
    this.routines[id] = input;
    return id;
  }
  find<TInput>(label: string): Routine<TInput, string> | null {
    return (this.routines[label] as Routine<TInput, string>) || null;
  }
  update<TInput>(label: string, input: Routine<TInput, string>): void {
    this.routines[label] = input;
  }
  remove(label: string): void {
    if (!this.routines[label]) return;
    this.routines[label].subroutines.forEach((subroutine) =>
      this.remove(subroutine)
    );
    delete this.routines[label];
  }
}

const container = new Container();

container
  .bind(EXPERIMENT_ENVIRONMENT_REDUCER_TYPES.ExperimentEnvironmentReducer)
  .to(EnvironmentReducer);
container
  .bind(
    EXPERIMENT_ENVIRONMENT_REDUCER_TYPES.ExperimentEnvironmentReducerFallback
  )
  .to(EnvironmentReducerFallback);

container.bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer).to(RootRenderer);
container.bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer).to(FooRenderer);
container.bind(EXPERIMENT_RENDERER_TYPES.ExperimentRenderer).to(BarRenderer);
container
  .bind(EXPERIMENT_RENDERER_TYPES.ExperimentRendererFallback)
  .to(FallbackRenderer);

container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuItemRenderer)
  .to(FooRenderer);
container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuItemRenderer)
  .to(BarRenderer);
container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentDefaultInputProvider)
  .to(FooRenderer);
container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentDefaultInputProvider)
  .to(BarRenderer);
container
  .bind(EXPERIMENT_MENU_RENDERER_TYPES.ExperimentMenuPanelRenderer)
  .to(SimpleMenuRenderer);

container
  .bind(ROUTINE_RENDERER_TYPES.ExperimentRendererProvider)
  .to(ExperimentRendererProvider);
container
  .bind(ROUTINE_RENDERER_TYPES.ExperimentEnvironmentReducerProvider)
  .to(ExperimentEnvironmentReducerProvider);
container
  .bind(ROUTINE_RENDERER_TYPES.SubroutineItemRenderer)
  .to(SimpleSubroutineItemRenderer);
container
  .bind(ROUTINE_RENDERER_TYPES.SubroutinesRenderer)
  .to(SimpleSubroutinesRenderer);
container
  .bind(ROUTINE_RENDERER_TYPES.ExperimentMenuRenderer)
  .to(ExperimentMenuRenderer);
container.bind(ROUTINE_RENDERER_TYPES.RoutineRenderer).to(RoutineRenderer);

function SimpleTab() {
  return (
    <Provider
      container={() => {
        return container;
      }}
    >
      <SimpleTabContent />
    </Provider>
  );
}

function SimpleTabContent() {
  const renderer = useInjection<
    RoutineRenderer<string, PropsWithDeclaration, Environment>
  >(ROUTINE_RENDERER_TYPES.RoutineRenderer);
  const [routines, setRoutines] = useState<{
    [key: string]: Routine<unknown, string>;
  }>({
    Root: { input: { _type: 'Root', data: {} }, subroutines: [] },
  });
  return (
    <renderer.render
      parentEnvironment={{
        $Global: ValueType.Number,
      }}
      experimentLabel="Root"
      routineService={{
        add: (input) => {
          const id = nanoid();
          setRoutines((oldRoutines) => ({
            ...oldRoutines,
            [id]: input,
          }));
          return id;
        },
        find: <TInput,>(label: string) => {
          return (routines[label] as Routine<TInput, string>) || null;
        },
        update: (label, input) => {
          setRoutines((oldRoutines) => ({
            ...oldRoutines,
            [label]: input,
          }));
        },
        remove: (label: string) => {
          // should be recursive, e.g.
          // routines[label].subroutines.forEach((subroutine) => this.remove(subroutine));
          setRoutines(R.pickBy((_, key) => key !== label));
        },
      }}
    />
  );
}

export default {
  component: SimpleTab,
  title: 'SimpleTab',
} as Meta;

const Template: Story = (args) => <SimpleTab {...args} />;

export const Default = Template.bind({});
Default.args = {};
