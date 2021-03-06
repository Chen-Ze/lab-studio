import { RecipeOutput } from '@lab-studio/shared/data/recipe/recipe-output';

export interface ExperimentWorkerEnvironment {
  variables: Record<string, number | number[]>;
}

export interface RecipeWithOutput {
  output(): RecipeOutput;
}

export interface ExperimentWorkerPayload<TRecipe> {
  recipe: TRecipe;
  environment: ExperimentWorkerEnvironment;
}

type PartialMap<T, V> = {
  [P in keyof T]: V;
};

export interface ExperimentWorkerResponse {
  handover(): Promise<void>;
  outputPrivate<T extends RecipeWithOutput>(
    recipe: T,
    outputList: PartialMap<ReturnType<T['output']>['innerOutputList'], unknown>
  ): void;
  outputPublic<T extends RecipeWithOutput>(
    recipe: T,
    outputList: PartialMap<ReturnType<T['output']>['outerOutputList'], unknown>
  ): void;
}

export interface ExperimentWorker<TRecipe> {
  execute(
    payload: ExperimentWorkerPayload<TRecipe>,
    response: ExperimentWorkerResponse
  ): Promise<void>;
}

export function workerForType(type: { new (): unknown }): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('workerForType', type.name, target.prototype);
  };
}

export function workerForTypeName(typeName: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('workerForType', typeName, target.prototype);
  };
}

export function shouldWorkExperimentByName(
  typeName: string,
  worker: ExperimentWorker<unknown>
) {
  return Reflect.getMetadata('workerForType', worker) === typeName;
}

export function shouldWorkExperiment(
  type: { new (): unknown },
  worker: ExperimentWorker<unknown>
) {
  return Reflect.getMetadata('workerForType', worker) === type.name;
}
