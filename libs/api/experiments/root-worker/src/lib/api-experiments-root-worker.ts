import {
  ExperimentWorker,
  ExperimentWorkerPayload,
  ExperimentWorkerResponse,
  workerForTypeName,
} from '@lab-studio/api/experiment/experiment-worker';
import { RootRecipe } from '@lab-studio/shared/experiments/root-recipe';
import { inject, injectable } from 'inversify';
import { RootInstrument } from '@lab-studio/instruments/root';

@workerForTypeName('Root')
@injectable()
export class RootWorker implements ExperimentWorker<RootRecipe> {
  constructor(@inject(RootInstrument) private rootInstrument: RootInstrument) {
    /* Do nothing */
  }

  async execute(
    payload: ExperimentWorkerPayload<RootRecipe>,
    response: ExperimentWorkerResponse
  ): Promise<void> {
    payload.recipe.instruments.forEach((instrument) => {
      this.rootInstrument.open(instrument.name, instrument.address);
    });
    await response.handover();
  }
}
