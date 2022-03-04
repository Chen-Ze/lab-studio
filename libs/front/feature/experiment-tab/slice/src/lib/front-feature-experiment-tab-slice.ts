import {
  createEntityAdapter,
  createSelector,
  createSlice,
  EntityId,
  EntityState,
  nanoid,
} from '@reduxjs/toolkit';
import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';

export interface RecipeEntity<TRecipePlain> {
  id: EntityId;
  recipe: TRecipePlain;
}

export type RecipeState<TRecipePlain> = EntityState<RecipeEntity<TRecipePlain>>;

export function makeRecipeSlice<TRecipe, TFeatureKey extends string>(
  allocator: ClassConstructor<TRecipe>,
  featureKey: TFeatureKey
) {
  const FEATURE_KEY = featureKey;
  const recipeAdapter =
    createEntityAdapter<RecipeEntity<Record<string, unknown>>>();
  const initialRecipeState: RecipeState<Record<string, unknown>> =
    recipeAdapter.getInitialState({});
  const recipeSlice = createSlice({
    name: FEATURE_KEY,
    initialState: initialRecipeState,
    reducers: {
      add: {
        reducer: recipeAdapter.addOne,
        prepare: (instance: TRecipe) => ({
          payload: { id: nanoid(), recipe: instanceToPlain(instance) },
        }),
      },
      remove: recipeAdapter.removeOne,
      update: {
        reducer: recipeAdapter.updateOne,
        prepare: (instance: TRecipe, id: EntityId) => ({
          payload: { id, changes: { recipe: instanceToPlain(instance) } },
        }),
      },
    },
  });
  const recipeReducer = recipeSlice.reducer;
  const recipeActions = recipeSlice.actions;
  const getRecipeState = (
    rootState: unknown
  ): RecipeState<Record<string, unknown>> =>
    // eslint-disable-next-line
    // @ts-ignore
    rootState[FEATURE_KEY];
  const { selectById } = recipeAdapter.getSelectors();
  const selectRecipeEntityById = (id: EntityId) =>
    createSelector(getRecipeState, (state) => selectById(state, id));
  const selectRecipeInstanceById = (id: EntityId) =>
    createSelector(getRecipeState, (state) =>
      plainToInstance(allocator, selectById(state, id))
    );

  return {
    FEATURE_KEY: featureKey,
    recipeAdapter,
    initialRecipeState,
    recipeSlice,
    recipeReducer,
    recipeActions,
    selectRecipeEntityById,
    selectRecipeInstanceById,
  };
}
