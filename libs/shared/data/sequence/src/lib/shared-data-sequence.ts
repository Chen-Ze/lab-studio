import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import { Typed } from '@lab-studio/shared/util/types';

// TODO: the declaration from RoutineRenderer should be imported here
export interface Routine<TInput, TRoutineLabel> {
  input: Typed<TInput>;
  subroutines: TRoutineLabel[];
}

export type Sequence = {
  [key: string]: {
    routine: Routine<ExperimentMeasurement<unknown>, string>;
  };
};
