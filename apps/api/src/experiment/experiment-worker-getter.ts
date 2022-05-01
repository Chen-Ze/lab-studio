import {
  ExperimentWorker,
  shouldWorkExperiment,
  shouldWorkExperimentByName,
} from '@lab-studio/api/experiment/experiment-worker';
import { ExperimentWorkerTypes } from '@lab-studio/api/experiments/container';
import { Injectable } from '@nestjs/common';
import { injectable, multiInject } from 'inversify';

@Injectable()
@injectable()
export class ExperimentWorkerGetter {
  constructor(
    @multiInject(ExperimentWorkerTypes.ExperimentWorkers)
    private workers: ExperimentWorker<unknown>[]
  ) {}

  getWorker<TRecipe>(recipeType: {
    new (): TRecipe;
  }): ExperimentWorker<TRecipe> {
    const worker = this.workers.find((worker) =>
      shouldWorkExperiment(recipeType, worker)
    );
    if (!worker) {
      throw new Error(`Worker for type ${recipeType} not found.`);
    }
    return worker;
  }

  getWorkerByName(typeName: string): ExperimentWorker<unknown> {
    const worker = this.workers.find((worker) =>
      shouldWorkExperimentByName(typeName, worker)
    );
    if (!worker) {
      throw new Error(`Worker for type ${typeName} not found.`);
    }
    return worker;
  }
}
