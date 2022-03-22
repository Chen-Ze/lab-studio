import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';

import * as React from 'react';
import { FooGetter } from './injectables';

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
}
