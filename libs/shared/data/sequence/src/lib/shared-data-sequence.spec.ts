import { sharedDataSequence } from './shared-data-sequence';

describe('sharedDataSequence', () => {
  it('should work', () => {
    expect(sharedDataSequence()).toEqual('shared-data-sequence');
  });
});
