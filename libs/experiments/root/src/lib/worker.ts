import {
  ExperimentWorker,
  ExperimentWorkerPayload,
  ExperimentWorkerResponse,
  workerForType,
} from '@lab-studio/api/experiment/experiment-worker';
import { RootRecipe } from './experiments-root';
import { inject } from 'inversify';
import { RootInstrument } from '@lab-studio/instruments/root';

@workerForType(RootRecipe)
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
  }
}
