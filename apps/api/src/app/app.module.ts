import { Module, Injectable } from '@nestjs/common';
import { injectable } from 'inversify';
import { ExperimentModule } from '../experiment/experiment.module';

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
  imports: [ExperimentModule],
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
