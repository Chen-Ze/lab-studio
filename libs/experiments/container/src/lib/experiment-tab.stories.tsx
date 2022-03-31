import 'reflect-metadata';
import {
  Routine,
  RoutineRenderer,
  ROUTINE_RENDERER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import { RecipeOutputTypes } from '@lab-studio/shared/data/recipe/recipe-output';
import MuiContainer from '@mui/material/Container';
import { nanoid } from '@reduxjs/toolkit';
import { Meta, Story } from '@storybook/react';
import { Provider, useInjection } from 'inversify-react';
import * as R from 'ramda';
import { useState } from 'react';
import { container } from './experiments-container';
import { RootRenderer } from '@lab-studio/experiments/root';

type Environment = ExperimentScope;

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
      unknown
    >
  >(ROUTINE_RENDERER_TYPES.RoutineRenderer);
  const [routines, setRoutines] = useState<{
    [key: string]: Routine<ExperimentMeasurement<unknown>, string>;
  }>({
    Root: {
      input: {
        _type: 'Root',
        data: new RootRenderer().defaultInput() as ExperimentMeasurement<unknown>,
      },
      subroutines: [],
    },
  });
  return (
    <renderer.render
      parentEnvironment={{
        variables: {},
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
          setRoutines(R.pickBy((_, key) => key !== label));
        },
      }}
    />
  );
}

export default {
  component: SimpleTab,
  title: 'ExperimentTab',
} as Meta;

const Template: Story = (args) => <SimpleTab {...args} />;

export const Default = Template.bind({});
Default.args = {};
