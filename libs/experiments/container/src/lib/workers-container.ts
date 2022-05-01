import { ApplyCurrentKeithley6221Worker } from '@lab-studio/experiments/apply-current-keithley-6221';
import { RootWorker } from '@lab-studio/experiments/root';
import { Container } from 'inversify';
import { ExperimentTypes } from './experiments-types';

const container = new Container();

container.bind(ExperimentTypes.ExperimentWorkers).to(RootWorker);
container
  .bind(ExperimentTypes.ExperimentWorkers)
  .to(ApplyCurrentKeithley6221Worker);

export { container as workersContainer };
