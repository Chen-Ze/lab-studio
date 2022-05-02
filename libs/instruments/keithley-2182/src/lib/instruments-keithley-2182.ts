import { inject, injectable } from 'inversify';
import {
  InstrumentController,
  TYPES,
} from '@lab-studio/api/instrument/controller';

@injectable()
export class Keithley2182 {
  constructor(
    @inject(TYPES.InstrumentController) private controller: InstrumentController
  ) {
    /* Do nothing */
  }

  async reset(name: string) {
    await this.controller.write(name, '*RST');
  }

  async setSensorFunction(name: string, func: 'VOLT' | 'TEMP') {
    await this.controller.write(name, `:SENS:FUNC '${func}'`);
  }

  async setSensorChannel(name: string, channel: '1' | '2') {
    await this.controller.write(name, `:SENS:CHAN ${channel}`);
  }

  async setChannelAutoRange(
    name: string,
    channel: '1' | '2',
    autoRange: 'ON' | 'OFF'
  ) {
    await this.controller.write(
      name,
      `:SENS:VOLT:CHAN${channel}:RANG:AUTO ${autoRange}`
    );
  }

  async read(name: string): Promise<string> {
    const data = await this.controller.query(name, ':READ?');
    return data;
  }
}
