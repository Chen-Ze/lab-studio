import { Module, Injectable } from '@nestjs/common';
import { injectable } from 'inversify';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import container from './container';
import { Fool } from './injectables';


@Injectable()
@injectable()
class MyFool implements Fool {
  greet(): string {
    return 'hi';
  }
}

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    MyFool,
    {
      provide: 'MyFoo',
      useFactory: (fool: Fool) => {
        container.bind('Fool').toConstantValue(fool);
        return container.get('FooGetter');
      },
      inject: [MyFool],
    },
  ],
})
export class AppModule {}
