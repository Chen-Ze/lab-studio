import { inject, injectable } from 'inversify';
import { EXPERIMENT_ENVIRONMENT_REDUCER_TYPES } from './experiment-environment-reducer-types';
import { ExperimentEnvironmentReducer } from '@lab-studio/front/feature/experiment-tab/experiment-environment-reducer';
import { Typed } from '@lab-studio/shared/util/types';

export function frontFeatureExperimentTabExperimentEnvironmentReducerProvider(): string {
  return 'front-feature-experiment-tab-experiment-environment-reducer-provider';
}

@injectable()
export class ExperimentEnvironmentReducerProvider<TInput, TEnvironment> {
  constructor(
    @inject(EXPERIMENT_ENVIRONMENT_REDUCER_TYPES.ExperimentEnvironmentReducer)
    private reducer: ExperimentEnvironmentReducer<TInput, TEnvironment>,
    @inject(
      EXPERIMENT_ENVIRONMENT_REDUCER_TYPES.ExperimentEnvironmentReducerFallback
    )
    private reducerFallback: ExperimentEnvironmentReducer<TInput, TEnvironment>
  ) {}

  reduce(inputTyped: Typed<TInput>, oldEnvironment: TEnvironment) {
    return (
      this.reducer.reduce(inputTyped.data, oldEnvironment) ||
      this.reducerFallback.reduce(inputTyped.data, oldEnvironment)
    );
  }
}
