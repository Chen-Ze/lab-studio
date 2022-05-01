import { apiExperimentsRootWorker } from './api-experiments-root-worker';

describe('apiExperimentsRootWorker', () => {
  it('should work', () => {
    expect(apiExperimentsRootWorker()).toEqual('api-experiments-root-worker');
  });
});
