import 'reflect-metadata';
import {
  defaultInputForType,
  ExperimentDefaultInputProvider,
} from '@lab-studio/front/feature/experiment-tab/experiment-default-input-provider';
import { ExperimentEnvironmentReducer } from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer';
import {
  ExperimentEnvironmentReducerProvider,
  EXPERIMENT_ENVIRONMENT_REDUCER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer-provider';
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
import {
  Routine,
  RoutineRenderer,
  ROUTINE_RENDERER_TYPES,
  SubroutineItemRenderer,
  SubroutineItemRendererProps,
  SubroutinesRenderer,
  SubroutinesRendererProps,
} from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import { makeExperiment } from '@lab-studio/front/ui/experiment-tab/experiment';
import {
  ExperimentMenu,
  ExperimentMenuItem,
} from '@lab-studio/front/ui/experiment-tab/experiment-menu';
import { RecipeFormProps } from '@lab-studio/front/ui/experiment-tab/form-props';
import { NumberInput } from '@lab-studio/front/ui/experiment-tab/number-input';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import {
  RecipeOutput,
  RecipeOutputTypes,
} from '@lab-studio/shared/data/recipe/recipe-output';
import AcIcon from '@mui/icons-material/AcUnit';
import CalcIcon from '@mui/icons-material/Calculate';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SwipeVerticalOutlinedIcon from '@mui/icons-material/SwipeVerticalOutlined';
import { Card, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import MuiContainer from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import { nanoid } from '@reduxjs/toolkit';
import { Meta, Story } from '@storybook/react';
import { Container, injectable } from 'inversify';
import { Provider, useInjection } from 'inversify-react';
import * as R from 'ramda';
import { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
  DraggableProvidedDragHandleProps,
} from 'react-beautiful-dnd';
import { StringInput } from '@lab-studio/front/ui/experiment-tab/string-input';

type Environment = ExperimentScope;

class RootRecipe {
  dataPath = '';
}

function RootForm(props: RecipeFormProps<RootRecipe>) {
  return <StringInput parentRecipeFormProps={props} entry="dataPath" />;
}

const RootExperiment = makeExperiment(RootForm, RootRecipe, (recipe) => ({
  innerOutputList: {
    $Global: {
      type: RecipeOutputTypes.Number,
    },
  },
  outerOutputList: {},
}));

@injectable()
@renderType('Root')
@defaultInputForType('Root')
class RootRenderer
  implements
    ExperimentRenderer<ExperimentMeasurement<RootRecipe>, Environment>,
    ExperimentDefaultInputProvider<ExperimentMeasurement<RootRecipe>>
{
  render(
    props: ExperimentRendererProps<
      ExperimentMeasurement<RootRecipe>,
      Environment
    >
  ) {
    return (
      <RootExperiment
        experimentMeasurement={props.inputData}
        scope={props.environmentData}
        onChange={props.onChange}
      />
    );
  }

  defaultInput(): ExperimentMeasurement<RootRecipe> {
    return {
      plainifiedRecipe: {
        dataPath: '',
      },
      recipeOutput: {
        innerOutputList: {
          $Global: {
            type: RecipeOutputTypes.Number,
          },
        },
        outerOutputList: {},
      },
    };
  }
}

class FooRecipe {
  value = 0;
  path = '';

  output(): RecipeOutput {
    return {
      innerOutputList: {
        Value: {
          type: RecipeOutputTypes.Number,
          declare: 'v',
          write: 'v',
        },
      },
      outerOutputList: {
        'All values': {
          type: RecipeOutputTypes.NumberArray,
          declare: 'V',
        },
      },
    };
  }
}

function FooForm(props: RecipeFormProps<FooRecipe>) {
  return (
    <div>
      <NumberInput parentRecipeFormProps={props} entry="value" />
      <StringInput parentRecipeFormProps={props} entry="path" />
    </div>
  );
}

const FooExperiment = makeExperiment(FooForm, FooRecipe, (recipe) =>
  recipe.output()
);

@injectable()
@renderType('Foo')
@itemForType('Foo')
@defaultInputForType('Foo')
class FooRenderer
  implements
    ExperimentRenderer<ExperimentMeasurement<FooRecipe>, Environment>,
    ExperimentMenuItemRenderer,
    ExperimentDefaultInputProvider<ExperimentMeasurement<FooRecipe>>
{
  render(
    props: ExperimentRendererProps<
      ExperimentMeasurement<FooRecipe>,
      Environment
    >
  ) {
    return (
      <FooExperiment
        experimentMeasurement={props.inputData}
        scope={props.environmentData}
        onChange={props.onChange}
      />
    );
  }

  renderMenuItem(props: ExperimentMenuItemRendererProps) {
    return (
      <ExperimentMenuItem icon={<AcIcon />} text="Foo" onClick={props.onAdd} />
    );
  }

  defaultInput(): ExperimentMeasurement<FooRecipe> {
    return {
      plainifiedRecipe: {
        value: 0,
        path: '',
      },
      recipeOutput: {
        innerOutputList: {
          Value: {
            type: RecipeOutputTypes.Number,
          },
        },
        outerOutputList: {
          'All values': {
            type: RecipeOutputTypes.NumberArray,
          },
        },
      },
    };
  }
}

class BarRecipe {
  start = 0;
  step = 1e-5;
  stop = 1e-4;

  output(): RecipeOutput {
    return {
      innerOutputList: {
        Current: {
          type: RecipeOutputTypes.Number,
          declare: 'i_',
        },
      },
      outerOutputList: {
        'All currents': {
          type: RecipeOutputTypes.NumberArray,
          declare: 'I_',
        },
      },
    };
  }
}

function BarForm(props: RecipeFormProps<BarRecipe>) {
  return (
    <>
      <NumberInput parentRecipeFormProps={props} entry="start" />
      <NumberInput parentRecipeFormProps={props} entry="stop" />
      <NumberInput parentRecipeFormProps={props} entry="step" />
    </>
  );
}

const BarExperiment = makeExperiment(BarForm, BarRecipe, (recipe) =>
  recipe.output()
);

@injectable()
@renderType('Bar')
@itemForType('Bar')
@defaultInputForType('Bar')
class BarRenderer
  implements
    ExperimentRenderer<ExperimentMeasurement<BarRecipe>, Environment>,
    ExperimentMenuItemRenderer,
    ExperimentDefaultInputProvider<ExperimentMeasurement<BarRecipe>>
{
  render(
    props: ExperimentRendererProps<
      ExperimentMeasurement<BarRecipe>,
      Environment
    >
  ) {
    return (
      <BarExperiment
        experimentMeasurement={props.inputData}
        scope={props.environmentData}
        onChange={props.onChange}
      />
    );
  }

  renderMenuItem(props: ExperimentMenuItemRendererProps) {
    return (
      <ExperimentMenuItem
        icon={<CalcIcon />}
        text="Bar"
        onClick={props.onAdd}
      />
    );
  }

  defaultInput(): ExperimentMeasurement<BarRecipe> {
    return {
      plainifiedRecipe: {
        start: 0,
        step: 1e-5,
        stop: 1e-4,
      },
      recipeOutput: {
        innerOutputList: {
          Current: {
            type: RecipeOutputTypes.Number,
          },
        },
        outerOutputList: {
          'All currents': {
            type: RecipeOutputTypes.NumberArray,
          },
        },
      },
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
  implements
    ExperimentEnvironmentReducer<ExperimentMeasurement<unknown>, Environment>
{
  reduce(input: ExperimentMeasurement<unknown>, oldEnvironment: Environment) {
    // signature of pluck: https://github.com/typed-typings/npm-ramda/issues/253
    // eslint-disable-next-line
    // @ts-ignore
    const newInnerList = R.pluck(
      'type',
      input.recipeOutput.innerOutputList
    ) as Record<string, RecipeOutputTypes>;
    // eslint-disable-next-line
    // @ts-ignore
    const newOuterList = R.pluck(
      'type',
      input.recipeOutput.outerOutputList
    ) as Record<string, RecipeOutputTypes>;
    return {
      innerEnvironment: {
        variables: R.mergeAll([newInnerList, oldEnvironment.variables]),
        columns: oldEnvironment.columns,
        instruments: R.mergeAll([
          input.recipeOutput.instrumentList || {},
          oldEnvironment.instruments,
        ]),
        addresses: oldEnvironment.addresses,
      },
      outerEnvironment: {
        variables: R.mergeAll([newOuterList, oldEnvironment.variables]),
        columns: oldEnvironment.columns,
        instruments: R.mergeAll([
          input.recipeOutput.instrumentList || {},
          oldEnvironment.instruments,
        ]),
        addresses: oldEnvironment.addresses,
      },
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

interface WithDragHandle {
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

@injectable()
class SimpleSubroutineItemRenderer
  implements SubroutineItemRenderer<WithDragHandle>
{
  render(props: SubroutineItemRendererProps<WithDragHandle>) {
    return (
      <Card variant="outlined">
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div {...props.additional.dragHandleProps}>
              <SwipeVerticalOutlinedIcon fontSize="small" color="disabled" />
            </div>
            <IconButton onClick={props.onRemove}>
              <DeleteForeverOutlinedIcon color="error" fontSize="small" />
            </IconButton>
          </Box>
          {props.children}
        </CardContent>
      </Card>
    );
  }
}

@injectable()
class SimpleSubroutinesRenderer implements SubroutinesRenderer<WithDragHandle> {
  render(props: SubroutinesRendererProps<WithDragHandle>) {
    return (
      <div>
        <div>{props.experiment}</div>
        <div
          style={{
            margin: '10px',
          }}
        >
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) return;
              props.onMove(result.source.index, result.destination?.index);
            }}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {props.subroutines.map((subroutine, i) => (
                    <Draggable
                      key={subroutine.key}
                      draggableId={subroutine.key}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div key={subroutine.key}>
                            {subroutine.render({
                              dragHandleProps: provided.dragHandleProps,
                            })}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {props.menu}
        </div>
      </div>
    );
  }
}

@injectable()
class SimpleMenuRenderer implements ExperimentMenuPanelRenderer {
  render(props: ExperimentMenuPanelRendererProps) {
    return (
      <ExperimentMenu
        childrenConstructors={props.childrenConstructors.map(
          (ChildConstructor, i) => (childProp) =>
            <ChildConstructor key={i} onAdd={childProp.onClick} />
        )}
      />
    );
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
  .to(RootRenderer);
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
      <MuiContainer>
        <SimpleTabContent />
      </MuiContainer>
    </Provider>
  );
}

function SimpleTabContent() {
  const renderer = useInjection<
    RoutineRenderer<
      string,
      ExperimentMeasurement<unknown>,
      Environment,
      WithDragHandle
    >
  >(ROUTINE_RENDERER_TYPES.RoutineRenderer);
  const [routines, setRoutines] = useState<{
    [key: string]: Routine<ExperimentMeasurement<unknown>, string>;
  }>({
    Root: {
      input: {
        _type: 'Root',
        data: {
          plainifiedRecipe: {
            dataPath: '',
          } as never,
          recipeOutput: {
            innerOutputList: {
              $Global: {
                type: RecipeOutputTypes.Number,
              },
            },
            outerOutputList: {},
          },
        },
      },
      subroutines: [],
    },
  });
  return (
    <renderer.render
      parentEnvironment={{
        variables: {
          $Global: RecipeOutputTypes.Number,
        },
        columns: ['ia', 'ib', 'va', 'vb'],
        instruments: {},
        addresses: [],
      }}
      experimentLabel="Root"
      routineService={{
        add: (input) => {
          const id = nanoid();
          setRoutines((oldRoutines) => ({
            ...oldRoutines,
            [id]: input as unknown as Routine<
              ExperimentMeasurement<unknown>,
              string
            >,
          }));
          return id;
        },
        find: <TInput,>(label: string) => {
          return (
            (routines[label] as unknown as Routine<TInput, string>) || null
          );
        },
        update: (label, input) => {
          setRoutines((oldRoutines) => ({
            ...oldRoutines,
            [label]: input as unknown as Routine<
              ExperimentMeasurement<unknown>,
              string
            >,
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
