import { RootRenderer } from '@lab-studio/front/experiments/root-renderer';
import { Routine } from '@lab-studio/front/feature/experiment-tab/routine-renderer';
import { ExperimentMeasurement } from '@lab-studio/shared/data/recipe/recipe';
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';

export const EXPERIMENTS_FEATURE_KEY = 'experiments';

/*
 * Update these interfaces according to your requirements.
 */
export interface ExperimentsEntity {
  id: string;
  routine: Routine<ExperimentMeasurement<unknown>, string>;
}

export interface ExperimentsState extends EntityState<ExperimentsEntity> {
  error?: string;
  loadingStatus: 'loading' | 'loaded' | 'error';
}

export const experimentsAdapter = createEntityAdapter<ExperimentsEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchExperiments())
 * }, [dispatch]);
 * ```
 */
export const fetchExperiments = createAsyncThunk(
  'experiments/fetchStatus',
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getExperimentss()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  }
);

export const initialExperimentsState: ExperimentsState =
  experimentsAdapter.getInitialState({
    loadingStatus: 'loaded',
    ids: ['Root'],
    entities: {
      Root: {
        id: 'Root',
        routine: {
          input: {
            _type: 'Root',
            data: new RootRenderer().defaultInput() as ExperimentMeasurement<unknown>,
          },
          subroutines: [],
        },
      },
    },
  });

export const experimentsSlice = createSlice({
  name: EXPERIMENTS_FEATURE_KEY,
  initialState: initialExperimentsState,
  reducers: {
    add: experimentsAdapter.addOne,
    remove: experimentsAdapter.removeOne,
    update: experimentsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperiments.pending, (state: ExperimentsState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchExperiments.fulfilled,
        (
          state: ExperimentsState,
          action: PayloadAction<ExperimentsEntity[]>
        ) => {
          experimentsAdapter.setAll(state, action.payload);
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchExperiments.rejected, (state: ExperimentsState, action) => {
        state.loadingStatus = 'error';
        state.error = action.error.message;
      });
  },
});

export const {
  add: addExperiment,
  remove: removeExperiment,
  update: updateExperiment,
} = experimentsSlice.actions;

/*
 * Export reducer for store configuration.
 */
export const experimentsReducer = experimentsSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(experimentsActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const experimentsActions = experimentsSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllExperiments);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */

export const getExperimentsState = (rootState: {
  [EXPERIMENTS_FEATURE_KEY]: ExperimentsState;
}): ExperimentsState => rootState[EXPERIMENTS_FEATURE_KEY];

const { selectById, selectEntities } =
  experimentsAdapter.getSelectors(getExperimentsState);

export { selectById as selectExperimentById };
export { selectEntities as selectExperimentEntities };
