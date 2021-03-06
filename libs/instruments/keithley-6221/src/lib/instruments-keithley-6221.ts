import { inject, injectable } from 'inversify';
import {
  InstrumentController,
  TYPES,
} from '@lab-studio/api/instrument/controller';

@injectable()
export class Keithley6221 {
  constructor(
    @inject(TYPES.InstrumentController) private controller: InstrumentController
  ) {
    /* Do nothing */
  }

  async clear(name: string) {
    await this.controller.write(name, 'CLEar');
  }

  async current(name: string, current: number) {
    await this.controller.write(name, `CURRent ${current}`);
  }

  async output(name: string, state: 'ON' | 'OFF') {
    await this.controller.write(name, `OUTPut ${state}`);
  }
}
