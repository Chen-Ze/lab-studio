export function frontFeatureExperimentTabExperimentEnvironmentReducer(): string {
  return 'front-feature-experiment-tab-experiment-environment-reducer';
}

export type ExperimentEnvironmentReducerOutput<TEnvironment> = {
  innerEnvironment: TEnvironment;
  outerEnvironment: TEnvironment;
};

export interface ExperimentEnvironmentReducer<TInput, TEnvironment> {
  reduce: (
    input: TInput,
    oldEnvironment: TEnvironment
  ) => ExperimentEnvironmentReducerOutput<TEnvironment>;
}
