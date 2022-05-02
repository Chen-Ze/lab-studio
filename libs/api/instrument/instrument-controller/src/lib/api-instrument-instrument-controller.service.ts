import { Injectable } from '@nestjs/common';
import { injectable } from 'inversify';
import { InstrumentController } from '@lab-studio/api/instrument/controller';

@Injectable()
@injectable()
export class ApiInstrumentInstrumentControllerService
  implements InstrumentController
{
  async list() {
    return ['GPIB6::INSTR::00', 'GPIB6::INSTR::01', 'GPIB6::INSTR::02'];
  }

  async open(name: string, address: string) {
    return;
  }

  async write(name: string, command: string) {
    return;
  }

  async query(name: string, command: string) {
    return `${Math.random()}`;
  }

  async read(name: string) {
    return `${Math.random()}`;
  }

  async stb(name: string): Promise<number> {
    return 0;
  }
}

export { ApiInstrumentInstrumentControllerService as InstrumentControllerService };
