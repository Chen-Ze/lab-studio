import { inject, injectable } from 'inversify';
import {
  InstrumentController,
  TYPES,
} from '@lab-studio/api/instrument/controller';

@injectable()
export class RootInstrument {
  constructor(
    @inject(TYPES.InstrumentController) private controller: InstrumentController
  ) {
    /* Do nothing */
  }

  open(name: string, address: string) {
    return this.controller.open(name, address);
  }
}
