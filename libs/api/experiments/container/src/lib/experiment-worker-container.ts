import { ApplyCurrentKeithley6221Worker } from '@lab-studio/api/experiments/apply-current-keithley-6221-worker';
import { RootWorker } from '@lab-studio/api/experiments/root-worker';
import { Container } from 'inversify';
import { ExperimentWorkerTypes } from './experiment-worker-types';

const container = new Container();

container.bind(ExperimentWorkerTypes.ExperimentWorkers).to(RootWorker);
container
  .bind(ExperimentWorkerTypes.ExperimentWorkers)
  .to(ApplyCurrentKeithley6221Worker);

export { container as experimentWorkerContainer };
