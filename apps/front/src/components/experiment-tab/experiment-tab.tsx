import {
  Routine,
  RoutineRenderer,
  ROUTINE_RENDERER_TYPES,
} from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import { ExperimentScope } from '@lab-studio/shared/data/recipe/experiment-scope';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import Container from '@mui/material/Container';
import { nanoid } from '@reduxjs/toolkit';
import { useInjection } from 'inversify-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExperiment,
  removeExperiment,
  selectExperimentEntities,
  updateExperiment,
} from '../../app/experiments.slice';

export function ExperimentTab() {
  const renderer = useInjection<
    RoutineRenderer<
      string,
      ExperimentMeasurement<unknown>,
      ExperimentScope,
      unknown
    >
  >(ROUTINE_RENDERER_TYPES.RoutineRenderer);
  const dispatch = useDispatch();
  const experimentEntities = useSelector(selectExperimentEntities);

  return (
    <Container>
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
            dispatch(
              addExperiment({
                id,
                routine: input as unknown as Routine<
                  ExperimentMeasurement<unknown>,
                  string
                >,
              })
            );
            return id;
          },
          find: <TInput,>(label: string) => {
            return (
              (experimentEntities[label]?.routine as unknown as Routine<
                TInput,
                string
              >) || null
            );
          },
          update: (id, input) => {
            dispatch(
              updateExperiment({
                id,
                changes: {
                  routine: input as unknown as Routine<
                    ExperimentMeasurement<unknown>,
                    string
                  >,
                },
              })
            );
          },
          remove: (label: string) => {
            dispatch(removeExperiment(label));
          },
        }}
      />
    </Container>
  );
}
