import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Sse,
} from '@nestjs/common';
import { Sequence } from '@lab-studio/shared/data/sequence';
import { ExperimentService } from './experiment.service';
import { interval, map, Observable } from 'rxjs';

@Controller('experiment')
export class ExperimentController {
  constructor(
    @Inject(ExperimentService) private experimentService: ExperimentService
  ) {}

  @Post('start-experiment')
  startExperiment(@Body() sequence: Sequence) {
    console.log(sequence);
    const id = this.experimentService.startExperiment(sequence);
    return id;
  }

  @Sse('listen-experiment/:id')
  listenExperiment(@Param('id') id: string): Observable<MessageEvent> {
    const observable = this.experimentService.observableById(id);
    // TODO: remove JSON.stringify
    const messageEventObservable = observable.pipe(
      map((value) => ({ data: value } as MessageEvent))
    );
    // TODO: remove
    messageEventObservable.subscribe((v) => console.log(`line 26: ${v}`, v));
    return messageEventObservable;
  }

  @Sse('listen-addresses')
  listenAddresses(): Observable<MessageEvent<string[]>> {
    // TODO: remove
    console.log('listen-addresses');
    return this.experimentService
      .observableAddresses()
      .pipe(map((addresses) => ({ data: addresses } as MessageEvent)));
  }
}
