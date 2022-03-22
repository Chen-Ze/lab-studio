import { instrumentsRandomNumberGenerator } from './instruments-random-number-generator';

describe('instrumentsRandomNumberGenerator', () => {
  it('should work', () => {
    expect(instrumentsRandomNumberGenerator()).toEqual(
      'instruments-random-number-generator'
    );
  });
});
