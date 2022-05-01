import { Body, Controller, Get, Inject, Post, Sse } from '@nestjs/common';

import { AppService } from './app.service';

import * as React from 'react';
import { FooGetter } from './injectables';
import { interval, map, Observable } from 'rxjs';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MyFoo') private myFoo: FooGetter
  ) {}

  @Get()
  getData() {
    // return this.appService.getData();
    const someString = `${React.useEffect}`;
    return `${this.myFoo.get()}`;
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: { hello: 'world' } } as MessageEvent))
    );
  }

  @Post('start-experiment')
  startExperiment(@Body() experiment: unknown) {
    console.log(experiment);
    return 'Hello!';
  }
}
