import { Module } from '@nestjs/common';
import { ApiInstrumentInstrumentControllerService } from './api-instrument-instrument-controller.service';

@Module({
  controllers: [],
  providers: [ApiInstrumentInstrumentControllerService],
  exports: [ApiInstrumentInstrumentControllerService],
})
export class ApiInstrumentInstrumentControllerModule {}
