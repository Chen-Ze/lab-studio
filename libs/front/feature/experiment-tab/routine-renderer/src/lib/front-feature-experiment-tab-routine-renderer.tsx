import { ExperimentEnvironmentReducerProvider } from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer-provider';
import { ExperimentMenuRenderer } from '@lab-studio/front/feature/experiment-tab/experiment-menu-renderer';
import { ExperimentRendererProvider } from '@lab-studio/front/feature/experiment-tab/experiment-renderer-provider';
import { encodeType, Typed } from '@lab-studio/shared/util/types';
import { instanceToPlain } from 'class-transformer';
import { inject, injectable } from 'inversify';
import * as R from 'ramda';
import React, { JSXElementConstructor, ReactNode } from 'react';
import { ROUTINE_RENDERER_TYPES } from './routine-renderer-types';

export interface Routine<TInput, TRoutineLabel> {
  input: Typed<TInput>;
  subroutines: TRoutineLabel[];
}

export interface RoutineService<TRoutineLabel> {
  add<TInput>(input: Routine<TInput, TRoutineLabel>): TRoutineLabel;
  find<TInput>(label: TRoutineLabel): Routine<TInput, TRoutineLabel> | null;
  update<TInput>(
    label: TRoutineLabel,
    input: Routine<TInput, TRoutineLabel>
  ): void;
  remove(label: TRoutineLabel): void;
}

export interface SubroutineItemRendererProps<TAdditional> {
  onRemove(): void;
  children: ReactNode;
  additional: TAdditional;
}

export interface SubroutineItemRenderer<TAdditional> {
  render: JSXElementConstructor<SubroutineItemRendererProps<TAdditional>>;
}

export interface SubroutinesRendererProps<TAdditional> {
  experiment: ReactNode;
  menu: ReactNode;
  subroutines: Array<{
    render: (additional: TAdditional) => JSX.Element;
    key: string;
  }>;
  onMove: (sourceIndex: number, destinationIndex: number) => void;
}

export interface SubroutinesRenderer<TAdditional> {
  render: JSXElementConstructor<SubroutinesRendererProps<TAdditional>>;
}

export interface RoutineRendererProps<TRoutineLabel, TEnvironment> {
  experimentLabel: TRoutineLabel;
  parentEnvironment: TEnvironment;
  routineService: RoutineService<TRoutineLabel>;
}

@injectable()
export class RoutineRenderer<
  TRoutineLabel,
  TInput,
  TEnvironment,
  TSubroutineItemAdditional
> {
  constructor(
    @inject(ROUTINE_RENDERER_TYPES.ExperimentRendererProvider)
    private experimentRendererProvider: ExperimentRendererProvider,
    @inject(ROUTINE_RENDERER_TYPES.ExperimentMenuRenderer)
    private experimentMenuRenderer: ExperimentMenuRenderer,
    @inject(ROUTINE_RENDERER_TYPES.SubroutinesRenderer)
    private subroutinesRenderer: SubroutinesRenderer<TSubroutineItemAdditional>,
    @inject(ROUTINE_RENDERER_TYPES.SubroutineItemRenderer)
    private subroutineItemRenderer: SubroutineItemRenderer<TSubroutineItemAdditional>,
    @inject(ROUTINE_RENDERER_TYPES.ExperimentEnvironmentReducerProvider)
    private experimentEnvironmentReducerProvider: ExperimentEnvironmentReducerProvider<
      TInput,
      TEnvironment
    >
  ) {
    /* Do nothing */
  }

  render = ({
    experimentLabel,
    parentEnvironment,
    routineService,
  }: RoutineRendererProps<TRoutineLabel, TEnvironment>) => {
    const experimentRoutine = routineService.find<TInput>(experimentLabel);
    const experimentInput =
      experimentRoutine?.input || encodeType('', {} as TInput); // call fallback
    const experimentInnerEnvironment =
      this.experimentEnvironmentReducerProvider.reduce(
        experimentInput,
        parentEnvironment
      ).innerEnvironment;

    const childrenLabels = experimentRoutine?.subroutines || [];
    const children =
      childrenLabels.map((subroutine) =>
        routineService.find<TInput>(subroutine)
      ) || [];
    const childrenInputs = children.map(
      (child) => child?.input || encodeType('', {} as TInput)
    );
    const childrenEnvironment = R.dropLast(
      1,
      R.scan(
        (previousEnvironment, childInput) =>
          this.experimentEnvironmentReducerProvider.reduce(
            childInput,
            previousEnvironment
          ).outerEnvironment,
        experimentInnerEnvironment,
        childrenInputs
      )
    );

    return (
      <this.subroutinesRenderer.render
        experiment={
          <this.experimentRendererProvider.render
            typedInput={{
              inputData: experimentInput,
              environmentData: parentEnvironment,
            }}
            onChange={(input) => {
              if (!experimentRoutine) return;
              routineService.update(experimentLabel, {
                ...experimentRoutine,
                input,
              });
            }}
          />
        }
        menu={
          <this.experimentMenuRenderer.render
            onAdd={(input) => {
              const newLabel = routineService.add({
                input,
                subroutines: [],
              });
              routineService.update(experimentLabel, {
                input: experimentInput,
                subroutines: [...childrenLabels, newLabel],
              });
            }}
          />
        }
        subroutines={childrenLabels.map((label, i) => ({
          render: (additional) => (
            <this.subroutineItemRenderer.render
              key={JSON.stringify(instanceToPlain(label))}
              onRemove={() => {
                const removeRecursive = (label: TRoutineLabel) => {
                  const subroutines = routineService.find(label)?.subroutines;
                  if (subroutines) {
                    subroutines.forEach((subroutine) =>
                      routineService.remove(subroutine)
                    );
                  }
                  routineService.remove(label);
                };
                removeRecursive(label);
                routineService.update(experimentLabel, {
                  input: experimentInput,
                  subroutines: childrenLabels.filter(
                    (childLabel) => childLabel !== label
                  ),
                });
              }}
              additional={additional}
            >
              <this.render
                experimentLabel={label}
                parentEnvironment={childrenEnvironment[i]}
                routineService={routineService}
              />
            </this.subroutineItemRenderer.render>
          ),
          key: JSON.stringify(instanceToPlain(label)),
        }))}
        onMove={(sourceIndex, destinationIndex) => {
          const reorder = <T,>(
            list: T[],
            startIndex: number,
            endIndex: number
          ) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
          };
          routineService.update(experimentLabel, {
            input: experimentInput,
            subroutines: reorder(childrenLabels, sourceIndex, destinationIndex),
          });
        }}
      />
    );
  };
}
