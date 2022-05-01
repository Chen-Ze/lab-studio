import {
  ExperimentWorker,
  ExperimentWorkerPayload,
  ExperimentWorkerResponse,
  workerForType,
} from '@lab-studio/api/experiment/experiment-worker';
import { ApplyCurrentKeithley6221Recipe } from './recipe';
import { linspace, LINSPACE_EPS_SCALE } from '@lab-studio/experiments/util';
import { Keithley6221 } from '@lab-studio/instruments/keithley-6221';
import { inject } from 'inversify';

@workerForType(ApplyCurrentKeithley6221Recipe)
export class ApplyCurrentKeithley6221Worker
  implements ExperimentWorker<ApplyCurrentKeithley6221Recipe>
{
  constructor(@inject(Keithley6221) private keithley6221: Keithley6221) {
    /* Do nothing */
  }

  async execute(
    payload: ExperimentWorkerPayload<ApplyCurrentKeithley6221Recipe>,
    response: ExperimentWorkerResponse
  ): Promise<void> {
    const { recipe } = payload;

    const getCurrentPoints = (
      start: number,
      stop: number,
      step: number,
      delta: number
    ) => {
      const intervalPoints = linspace(
        Number(start),
        Number(stop),
        Number(step)
      );
      const intervalStarts = intervalPoints.slice(0, -1);
      const intervalEnds = intervalPoints.slice(1);
      const intervals = intervalStarts.map((start, i) => ({
        start,
        end: intervalEnds[i],
      }));
      return [
        [Number(start)],
        ...intervals.map(({ start, end }) =>
          linspace(
            start,
            end,
            Number(delta),
            true,
            false,
            Number(delta) * LINSPACE_EPS_SCALE
          )
        ),
      ];
    };

    const currentPointsPieces = recipe.currentPieces.map((currentPiece) =>
      getCurrentPoints(
        currentPiece.start,
        currentPiece.stop,
        currentPiece.step,
        currentPiece.delta
      )
    );

    for (const currentPoints of currentPointsPieces) {
      for (const currentIntervalPoints of currentPoints) {
        for (const currentPoint of currentIntervalPoints) {
          this.keithley6221.current(recipe.instrumentName, currentPoint);
        }
        response.outputPrivate(recipe, {
          Current: currentIntervalPoints[0],
        });
        await response.handover();
      }
    }

    response.outputPublic(recipe, {
      'All Currents': currentPointsPieces
        .map((currentPoints) =>
          currentPoints.map(
            (currentIntervalPoints) => currentIntervalPoints.slice(-1)[0]
          )
        )
        .flat(),
    });
  }
}
