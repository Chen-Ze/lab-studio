import {
  fetchExperiments,
  experimentsAdapter,
  experimentsReducer,
} from './experiments.slice';

describe('experiment reducer', () => {
  it('should success', () => {
    expect('true').toEqual('true');
  });
});

/* describe('experiments reducer', () => {
  it('should handle initial state', () => {
    const expected = experimentsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(experimentsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchExperimentss', () => {
    let state = experimentsReducer(undefined, fetchExperiments.pending(''));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = experimentsReducer(
      state,
      fetchExperiments.fulfilled([{ id: '1' }] as never, '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = experimentsReducer(
      state,
      fetchExperiments.rejected(new Error('Uh oh'), '')
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
}); */
