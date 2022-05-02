import { inject, injectable } from 'inversify';
import {
  InstrumentController,
  TYPES,
} from '@lab-studio/api/instrument/controller';
import * as R from 'ramda';

@injectable()
export class RandomNumberGenerator {
  constructor(
    @inject(TYPES.InstrumentController) private controller: InstrumentController
  ) {
    /* Do nothing */
  }

  async generate(count: number): Promise<number[]> {
    return R.times(() => Math.random(), count);
  }

  async generateRange(
    count: number,
    min: number,
    max: number
  ): Promise<number[]> {
    return R.map(
      (x: number) => (1 - x) * min + x * max,
      R.times(() => Math.random(), count)
    );
  }
}
