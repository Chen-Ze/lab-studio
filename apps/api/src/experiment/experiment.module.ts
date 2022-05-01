import {
  InstrumentControllerService,
  InstrumentControllerTypes,
} from '@lab-studio/api/instrument/instrument-controller';
import { experimentWorkerContainer } from '@lab-studio/api/experiments/container';
import { instrumentsContainer } from '@lab-studio/instruments/container';
import { Module } from '@nestjs/common';
import { Container } from 'inversify';
import { ExperimentWorkerGetter } from './experiment-worker-getter';
import { ExperimentService } from './experiment.service';
import { ExperimentController } from './experiment.controller';

@Module({
  providers: [
    ExperimentService,
    InstrumentControllerService,
    {
      provide: ExperimentWorkerGetter,
      useFactory: (instrumentController: InstrumentControllerService) => {
        const container = Container.merge(
          experimentWorkerContainer,
          instrumentsContainer
        );
        container
          .bind(InstrumentControllerTypes.InstrumentController)
          .toConstantValue(instrumentController);
        container.bind('ExperimentWorkerGetter').to(ExperimentWorkerGetter);
        return container.get('ExperimentWorkerGetter');
      },
      inject: [InstrumentControllerService],
    },
  ],
  controllers: [ExperimentController],
})
export class ExperimentModule {}
