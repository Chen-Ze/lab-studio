import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  Sse,
} from '@nestjs/common';
import { Sequence } from '@lab-studio/shared/data/sequence';
import { ExperimentService } from './experiment.service';
import { map, Observable } from 'rxjs';

@Controller('experiment')
export class ExperimentController {
  constructor(
    @Inject(ExperimentService) private experimentService: ExperimentService
  ) {}

  @Post('start-experiment')
  startExperiment(@Body() sequence: Sequence) {
    const id = this.experimentService.startExperiment(sequence);
    return id;
  }

  @Get('terminate-experiment')
  terminateExperiment(@Query('id') id: string) {
    this.experimentService.terminateExperiment(id);
    return id;
  }

  @Sse('listen-experiment/:id')
  listenExperiment(@Param('id') id: string): Observable<MessageEvent> {
    const observable = this.experimentService.observableById(id);
    const messageEventObservable = observable.pipe(
      map((value) => ({ data: value } as MessageEvent))
    );
    return messageEventObservable;
  }

  @Sse('listen-addresses')
  listenAddresses(): Observable<MessageEvent<string[]>> {
    return this.experimentService
      .observableAddresses()
      .pipe(map((addresses) => ({ data: addresses } as MessageEvent)));
  }
}
