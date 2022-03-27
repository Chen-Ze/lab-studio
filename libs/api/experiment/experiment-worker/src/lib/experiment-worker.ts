export interface ExperimentWorkerEnvironment {
  variables: Record<string, number | number[]>;
}

export interface ExperimentWorkerPayload<TRecipe> {
  recipe: TRecipe;
  environment: ExperimentWorkerEnvironment;
}

export interface ExperimentWorkerResponse {
  setPrivate(variables: Record<string, number | number[]>): void;
  setPublic(variable: Record<string, number | number[]>): void;
  write(variables: Record<string, number | number[]>): void;
}

export interface ExperimentWorker<TRecipe> {
  execute(
    payload: ExperimentWorkerPayload<TRecipe>,
    response: ExperimentWorkerResponse
  ): Promise<void>;
}
