import { Test } from '@nestjs/testing';
import { ApiInstrumentInstrumentControllerService } from './api-instrument-instrument-controller.service';

describe('ApiInstrumentInstrumentControllerService', () => {
  let service: ApiInstrumentInstrumentControllerService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [ApiInstrumentInstrumentControllerService],
    }).compile();

    service = module.get(ApiInstrumentInstrumentControllerService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
